"use client";

import React, { useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAgentFormStore } from "@/store/agentFormStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useDropzone } from "react-dropzone";
import {
  Building,
  CheckCircle,
  FileText,
  FileBadge,
  Sparkles,
  MapPin,
  Flame,
  ArrowRight,
  ArrowLeft,
  Upload,
  Plus,
  Trash,
  Info,
  Droplet,
  Zap,
  ShieldCheck,
  Compass,
  Milestone,
  Grid
} from "lucide-react";

// 1. Zod Validation Schemas per step
const step1Schema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters long").max(100, "Title is too long"),
  type: z.string().min(1, "Please select property type"),
  price: z.preprocess((val) => Number(val), z.number().min(100000, "Price must be at least ₹1 Lakh")),
  city: z.string().min(1, "Please select city"),
  locality: z.string().min(3, "Locality must be at least 3 characters"),
  areaSqFt: z.preprocess((val) => Number(val), z.number().min(100, "Area must be at least 100 sqft")),
  bedrooms: z.preprocess((val) => Number(val), z.number().min(1, "Bedrooms must be at least 1")),
  bathrooms: z.preprocess((val) => Number(val), z.number().min(1, "Bathrooms must be at least 1")),
  purpose: z.enum(["buy", "rent"]),
});

const step2Schema = z.object({
  isDTCPApproved: z.boolean().default(false),
  isCMDAApproved: z.boolean().default(false),
  cmdaStatus: z.string().default(""),
  reraNumber: z.string().default(""),
  isRERAApproved: z.boolean().default(false),
  pattaNumber: z.string().min(3, "Valid Patta/Chitta number required for proof of land ownership"),
  waterAvailability: z.string().min(1, "Water availability detail required"),
  ebConnection: z.string().min(1, "EB status is required"),
  isFloodSafe: z.boolean().default(true),
  isVaastuCompliant: z.boolean().default(true),
  roadWidth: z.string().min(1, "Road width detail is required"),
  drainage: z.string().min(1, "Drainage description is required"),
});

const step3Schema = z.object({
  description: z.string().min(30, "Please write a descriptive summary (at least 30 characters)"),
  amenities: z.array(z.string()).min(1, "Please select at least 1 amenity"),
  furnished: z.enum(["Yes", "No", "Semi"]),
  status: z.enum(["ready-to-move", "under-construction", "plot"]),
});

const AMENITIES_LIST = [
  "24/7 Security",
  "Power Backup",
  "Swimming Pool",
  "Fully Equipped Gym",
  "Lift / Elevator",
  "Reserved Parking",
  "RO Water Plant",
  "Clubhouse",
  "Vaastu Compliant",
  "CCTV Surveillance",
  "Rainwater Harvesting",
  "Children's Play Area",
];

const SAMPLE_LUXURY_IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
];

export default function AddPropertyForm() {
  const { currentStep, formData, setStep, updateFormData, resetForm } = useAgentFormStore();

  // Step schemas mapping
  const getStepSchema = (step: number) => {
    switch (step) {
      case 1:
        return step1Schema;
      case 2:
        return step2Schema;
      case 3:
        return step3Schema;
      default:
        return z.any();
    }
  };

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(getStepSchema(currentStep)),
    defaultValues: formData,
  });

  // Watch fields for Step 4 image uploads and step-specific displays
  const watchedImages = watch("images") || [];
  const watchedType = watch("type");

  // Handle step completion
  const onNextStep = (data: Record<string, unknown>) => {
    updateFormData(data);
    setStep(currentStep + 1);
  };

  const onPrevStep = () => {
    // Save current values to Zustand store before going back
    const currentValues = watch();
    updateFormData(currentValues);
    setStep(currentStep - 1);
  };

  const onSubmitAll = () => {
    const finalData = { ...formData, images: watchedImages };
    console.log("Submitting property detail payload:", finalData);
    alert(
      `Congratulations! "Aadana Tharakar Verification Council" has successfully scheduled review for: ${finalData.title}. Registered Patta: ${finalData.pattaNumber}.`
    );
    resetForm();
  };

  // Dropzone Setup for Step 4
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Create local object URLs for display mock
      const newUrls = acceptedFiles.map((file) => URL.createObjectURL(file));
      const updatedImages = [...watchedImages, ...newUrls];
      setValue("images", updatedImages, { shouldValidate: true });
      updateFormData({ images: updatedImages });
    },
    [watchedImages, setValue, updateFormData]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 6,
  });

  const removeImage = (index: number) => {
    const updatedImages = watchedImages.filter((_: string, i: number) => i !== index);
    setValue("images", updatedImages, { shouldValidate: true });
    updateFormData({ images: updatedImages });
  };

  const loadSampleImages = () => {
    setValue("images", SAMPLE_LUXURY_IMAGES, { shouldValidate: true });
    updateFormData({ images: SAMPLE_LUXURY_IMAGES });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Sparkles className="size-5.5 text-[#C9A84C]" /> Add New Luxury Listing
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Submit details for the Aadana Tharakar Verification Board. Double-check your Patta/Chitta and RERA inputs.
        </p>
      </div>

      {/* Modern Stepper Indicator */}
      <div className="grid grid-cols-5 gap-2 text-center select-none">
        {[
          { step: 1, label: "Basic Info", icon: Building },
          { step: 2, label: "TN Verification", icon: FileBadge },
          { step: 3, label: "Amenities", icon: Grid },
          { step: 4, label: "Photos", icon: Upload },
          { step: 5, label: "Review & Post", icon: CheckCircle },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = currentStep === item.step;
          const isCompleted = currentStep > item.step;

          return (
            <div
              key={item.step}
              className={`p-2.5 rounded-lg border flex flex-col items-center transition-all ${
                isActive
                  ? "bg-slate-900 border-slate-900 text-white shadow-xs"
                  : isCompleted
                  ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                  : "bg-white border-slate-200 text-slate-400"
              }`}
            >
              <Icon className={`size-4 ${isActive ? "text-[#C9A84C]" : ""}`} />
              <span className="text-[10px] font-bold mt-1.5 hidden sm:inline-block">{item.label}</span>
              <span className="text-[8px] font-extrabold tracking-widest uppercase mt-0.5 sm:hidden">
                S{item.step}
              </span>
            </div>
          );
        })}
      </div>

      {/* Main Form Body */}
      <Card className="bg-white border-slate-200 shadow-sm p-6 md:p-8">
        <form onSubmit={handleSubmit(onNextStep)} className="space-y-6">
          {/* STEP 1: BASIC INFORMATION */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in-50 duration-300">
              <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                <Building className="size-4.5 text-slate-500" />
                <h3 className="font-extrabold text-slate-800 text-sm">Step 1: Property Foundation & Key Details</h3>
              </div>

              {/* Title input */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-xs font-bold text-slate-700">
                  Listing Title (English & Descriptive) <span className="text-rose-500">*</span>
                </Label>
                <Input
                  id="title"
                  {...register("title")}
                  placeholder="e.g. Vasantham Premium 4BHK East-Facing Luxury Villa"
                  className={errors.title ? "border-rose-500 bg-rose-50/10 focus:border-rose-500" : "bg-slate-50/50"}
                />
                {errors.title && <p className="text-[10px] text-rose-500 font-bold">{errors.title.message as string}</p>}
              </div>

              {/* Purpose and Type Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="purpose" className="text-xs font-bold text-slate-700">Purpose</Label>
                  <select
                    id="purpose"
                    {...register("purpose")}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-lg py-2 px-3 text-xs text-slate-700 focus:outline-none focus:border-slate-400 transition-colors h-9"
                  >
                    <option value="buy">For Sale (Buy)</option>
                    <option value="rent">For Rent</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type" className="text-xs font-bold text-slate-700">Property Type</Label>
                  <select
                    id="type"
                    {...register("type")}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-lg py-2 px-3 text-xs text-slate-700 focus:outline-none focus:border-slate-400 transition-colors h-9"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa / Individual House</option>
                    <option value="Plot">Residential Land / Plot</option>
                    <option value="Commercial">Commercial Property</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price" className="text-xs font-bold text-slate-700">Price (INR ₹) <span className="text-rose-500">*</span></Label>
                  <Input
                    id="price"
                    type="number"
                    {...register("price")}
                    placeholder="e.g. 18500000"
                    className={errors.price ? "border-rose-500 bg-rose-50/10 focus:border-rose-500" : "bg-slate-50/50"}
                  />
                  {errors.price && <p className="text-[10px] text-rose-500 font-bold">{errors.price.message as string}</p>}
                </div>
              </div>

              {/* Location Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-xs font-bold text-slate-700">City in Tamil Nadu</Label>
                  <select
                    id="city"
                    {...register("city")}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-lg py-2 px-3 text-xs text-slate-700 focus:outline-none focus:border-slate-400 transition-colors h-9"
                  >
                    <option value="Chennai">Chennai</option>
                    <option value="Coimbatore">Coimbatore</option>
                    <option value="Madurai">Madurai</option>
                    <option value="Salem">Salem</option>
                    <option value="Trichy">Trichy</option>
                    <option value="Tirunelveli">Tirunelveli</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="locality" className="text-xs font-bold text-slate-700">Locality / Area Name <span className="text-rose-500">*</span></Label>
                  <Input
                    id="locality"
                    {...register("locality")}
                    placeholder="e.g. Akkarai ECR"
                    className={errors.locality ? "border-rose-500 bg-rose-50/10 focus:border-rose-500" : "bg-slate-50/50"}
                  />
                  {errors.locality && <p className="text-[10px] text-rose-500 font-bold">{errors.locality.message as string}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="areaSqFt" className="text-xs font-bold text-slate-700">Built-up / Plot Area (sqft) <span className="text-rose-500">*</span></Label>
                  <Input
                    id="areaSqFt"
                    type="number"
                    {...register("areaSqFt")}
                    placeholder="e.g. 3200"
                    className={errors.areaSqFt ? "border-rose-500 bg-rose-50/10 focus:border-rose-500" : "bg-slate-50/50"}
                  />
                  {errors.areaSqFt && <p className="text-[10px] text-rose-500 font-bold">{errors.areaSqFt.message as string}</p>}
                </div>
              </div>

              {/* Bedrooms & Bathrooms (Only if not a plot) */}
              {watchedType !== "Plot" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms" className="text-xs font-bold text-slate-700">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      {...register("bedrooms")}
                      className="bg-slate-50/50"
                    />
                    {errors.bedrooms && <p className="text-[10px] text-rose-500 font-bold">{errors.bedrooms.message as string}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bathrooms" className="text-xs font-bold text-slate-700">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      {...register("bathrooms")}
                      className="bg-slate-50/50"
                    />
                    {errors.bathrooms && <p className="text-[10px] text-rose-500 font-bold">{errors.bathrooms.message as string}</p>}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: TAMIL NADU DETAILS */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in-50 duration-300">
              <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                <FileBadge className="size-4.5 text-[#C9A84C]" />
                <h3 className="font-extrabold text-slate-800 text-sm">Step 2: Tamil Nadu Verification Matrix</h3>
              </div>

              <div className="p-3 bg-amber-50/40 border border-amber-200/50 rounded-lg flex items-start gap-2.5">
                <Info className="size-4 text-amber-600 mt-0.5 shrink-0" />
                <p className="text-[10px] text-slate-600 leading-relaxed font-medium">
                  <strong>Verification Warning:</strong> Entering correct Patta/Chitta registry indices is vital. Mismatched Patta indices undergo immediate verification holds from the municipal panel.
                </p>
              </div>

              {/* Compliance Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50/50 border border-slate-200 p-3 rounded-lg flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-700">DTCP Approved</span>
                    <span className="text-[9px] text-slate-400">Directorate of Town & Country Planning</span>
                  </div>
                  <Controller
                    name="isDTCPApproved"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-slate-300 data-[state=checked]:bg-slate-900"
                      />
                    )}
                  />
                </div>

                <div className="bg-slate-50/50 border border-slate-200 p-3 rounded-lg flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-700">CMDA Approved</span>
                    <span className="text-[9px] text-slate-400">Chennai Metro Dev Authority</span>
                  </div>
                  <Controller
                    name="isCMDAApproved"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-slate-300 data-[state=checked]:bg-slate-900"
                      />
                    )}
                  />
                </div>

                <div className="bg-slate-50/50 border border-slate-200 p-3 rounded-lg flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-700">RERA Verified</span>
                    <span className="text-[9px] text-slate-400">Real Estate Regulatory Authority</span>
                  </div>
                  <Controller
                    name="isRERAApproved"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-slate-300 data-[state=checked]:bg-slate-900"
                      />
                    )}
                  />
                </div>
              </div>

              {/* Approval Strings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cmdaStatus" className="text-xs font-bold text-[#0F172A]">CMDA / DTCP File Number</Label>
                  <Input
                    id="cmdaStatus"
                    {...register("cmdaStatus")}
                    placeholder="e.g. L.P.No / CMDA / 2024"
                    className="bg-slate-50/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reraNumber" className="text-xs font-bold text-[#0F172A]">RERA Registry ID</Label>
                  <Input
                    id="reraNumber"
                    {...register("reraNumber")}
                    placeholder="e.g. TN/29/Building/0122/2026"
                    className="bg-slate-50/50 font-mono text-[11px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pattaNumber" className="text-xs font-bold text-slate-700">
                    Patta/Chitta Registry Index <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="pattaNumber"
                    {...register("pattaNumber")}
                    placeholder="e.g. Patta No: 3481, Survey 14/2"
                    className={errors.pattaNumber ? "border-rose-500 bg-rose-50/10 focus:border-rose-500" : "bg-slate-50/50"}
                  />
                  {errors.pattaNumber && <p className="text-[10px] text-rose-500 font-bold">{errors.pattaNumber.message as string}</p>}
                </div>
              </div>

              {/* Resource availability matrix */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="waterAvailability" className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Droplet className="size-3.5 text-blue-500 shrink-0" /> Water Resource Supply
                  </Label>
                  <select
                    id="waterAvailability"
                    {...register("waterAvailability")}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-lg py-2 px-3 text-xs text-slate-700 focus:outline-none focus:border-slate-400 h-9"
                  >
                    <option value="24 Hours Borewell">24 Hours Borewell Supply</option>
                    <option value="Siruvani Water Connection">Siruvani Corporation Water</option>
                    <option value="Metro Water & Borewell">Metro Water & Borewell Combination</option>
                    <option value="Panchayat Water Feed">Panchayat Water Feed</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ebConnection" className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Zap className="size-3.5 text-amber-500 shrink-0" /> TNEB Electrical Connection
                  </Label>
                  <select
                    id="ebConnection"
                    {...register("ebConnection")}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-lg py-2 px-3 text-xs text-slate-700 focus:outline-none focus:border-slate-400 h-9"
                  >
                    <option value="3 Phase Connection">3 Phase Commercial (TNEB)</option>
                    <option value="Single Phase Feed">Single Phase Domestic (TNEB)</option>
                    <option value="Solar Powered Hybrid Grid">Solar Powered Hybrid Grid Feed</option>
                  </select>
                </div>
              </div>

              {/* Safe status toggles & Road specs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="roadWidth" className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Milestone className="size-3.5 text-slate-500 shrink-0" /> Front Facing Road Width
                  </Label>
                  <Input
                    id="roadWidth"
                    {...register("roadWidth")}
                    placeholder="e.g. 30 Feet Tar Road"
                    className="bg-slate-50/50"
                  />
                  {errors.roadWidth && <p className="text-[10px] text-rose-500 font-bold">{errors.roadWidth.message as string}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="drainage" className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Compass className="size-3.5 text-slate-500 shrink-0" /> Local Drainage System
                  </Label>
                  <Input
                    id="drainage"
                    {...register("drainage")}
                    placeholder="e.g. Corporation Underground Drainage"
                    className="bg-slate-50/50"
                  />
                  {errors.drainage && <p className="text-[10px] text-rose-500 font-bold">{errors.drainage.message as string}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50/50 border border-slate-200 p-3 rounded-lg flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                      <ShieldCheck className="size-3.5 text-emerald-600 shrink-0" /> Flood Resilience
                    </span>
                    <span className="text-[9px] text-slate-400">High-elevation flood safe zone</span>
                  </div>
                  <Controller
                    name="isFloodSafe"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-slate-300 data-[state=checked]:bg-slate-900"
                      />
                    )}
                  />
                </div>

                <div className="bg-slate-50/50 border border-slate-200 p-3 rounded-lg flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                      <Compass className="size-3.5 text-slate-500 shrink-0" /> Vaastu Compliant Layout
                    </span>
                    <span className="text-[9px] text-slate-400">Strictly mapped to traditional directions</span>
                  </div>
                  <Controller
                    name="isVaastuCompliant"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-slate-300 data-[state=checked]:bg-slate-900"
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: DESCRIPTION + AMENITIES */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in-50 duration-300">
              <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                <FileText className="size-4.5 text-slate-500" />
                <h3 className="font-extrabold text-slate-800 text-sm">Step 3: Marketing Summary & Luxury Amenities</h3>
              </div>

              {/* Status and Furnished Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-xs font-bold text-slate-700">Construction Status</Label>
                  <select
                    id="status"
                    {...register("status")}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-lg py-2 px-3 text-xs text-slate-700 focus:outline-none focus:border-slate-400 h-9"
                  >
                    <option value="ready-to-move">Ready to Move</option>
                    <option value="under-construction">Under Construction</option>
                    <option value="plot">Plot / Vacant Land</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="furnished" className="text-xs font-bold text-slate-700">Furnishing State</Label>
                  <select
                    id="furnished"
                    {...register("furnished")}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-lg py-2 px-3 text-xs text-slate-700 focus:outline-none focus:border-slate-400 h-9"
                  >
                    <option value="Semi">Semi-Furnished</option>
                    <option value="Yes">Fully Furnished</option>
                    <option value="No">Unfurnished</option>
                  </select>
                </div>
              </div>

              {/* Text Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-xs font-bold text-slate-700">
                  Detailed Property Description <span className="text-rose-500">*</span>
                </Label>
                <textarea
                  id="description"
                  {...register("description")}
                  rows={5}
                  placeholder="Provide an extensive highlight of the property's design aesthetics, neighborhood accessibility, local landmarks, and verification credentials..."
                  className={`w-full bg-slate-50/50 border rounded-lg py-2 px-3 text-xs text-slate-700 focus:outline-none focus:border-slate-400 transition-colors ${
                    errors.description ? "border-rose-500 bg-rose-50/10 focus:border-rose-500" : "border-slate-200"
                  }`}
                />
                {errors.description && <p className="text-[10px] text-rose-500 font-bold">{errors.description.message as string}</p>}
              </div>

              {/* Amenities checkboxes */}
              <div className="space-y-2.5">
                <Label className="text-xs font-bold text-slate-700">
                  Select Key Amenities Available <span className="text-rose-500">*</span>
                </Label>
                <Controller
                  name="amenities"
                  control={control}
                  render={({ field }) => {
                    const selected = field.value || [];
                    return (
                      <div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {AMENITIES_LIST.map((amenity) => {
                            const isChecked = selected.includes(amenity);
                            return (
                              <label
                                key={amenity}
                                className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
                                  isChecked
                                    ? "bg-slate-900 border-slate-900 text-white shadow-2xs"
                                    : "bg-slate-50/50 border-slate-200 text-slate-600 hover:bg-slate-55"
                                }`}
                              >
                                <Checkbox
                                  checked={isChecked}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...selected, amenity]);
                                    } else {
                                      field.onChange(selected.filter((item: string) => item !== amenity));
                                    }
                                  }}
                                  className="sr-only" // Hidden visually, using container highlights
                                />
                                <span>{amenity}</span>
                              </label>
                            );
                          })}
                        </div>
                        {errors.amenities && (
                          <p className="text-[10px] text-rose-500 font-bold mt-2">{errors.amenities.message as string}</p>
                        )}
                      </div>
                    );
                  }}
                />
              </div>
            </div>
          )}

          {/* STEP 4: IMAGES UPLOADER */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in-50 duration-300">
              <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                <Upload className="size-4.5 text-slate-500" />
                <h3 className="font-extrabold text-slate-800 text-sm">Step 4: Premium Property Gallery Uploader</h3>
              </div>

              {/* Drag and Drop Zone */}
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                  isDragActive
                    ? "border-[#C9A84C] bg-amber-50/30 scale-99"
                    : "border-slate-200 hover:border-slate-400 bg-slate-50/30"
                }`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-2 text-slate-500">
                  <Upload className="size-8 text-slate-400 animate-bounce" />
                  <p className="text-xs font-bold text-slate-700">Drag & Drop Property Images</p>
                  <p className="text-[10px] text-slate-400">
                    Supports high-resolution PNG, JPG, or WEBP (Max 6 photos)
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <span>Uploaded Images: {watchedImages.length} of 6</span>
                <button
                  type="button"
                  onClick={loadSampleImages}
                  className="text-[#0F172A] hover:underline"
                >
                  Load sample luxury templates
                </button>
              </div>

              {/* Image Grid with Previews */}
              {watchedImages.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  {watchedImages.map((url: string, idx: number) => (
                    <div
                      key={idx}
                      className="relative h-24 rounded-lg overflow-hidden border border-slate-200 shadow-2xs group"
                    >
                      <img src={url} alt={`Listing upload ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1.5 right-1.5 size-5 bg-black/60 hover:bg-rose-600 rounded-full text-white flex items-center justify-center transition-colors"
                        title="Delete photo"
                      >
                        <Trash className="size-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEP 5: REVIEW & CONFIRM */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-in fade-in-50 duration-300">
              <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                <CheckCircle className="size-4.5 text-emerald-600" />
                <h3 className="font-extrabold text-slate-800 text-sm">Step 5: Verification Portal Review</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
                {/* Basic Review Panel */}
                <div className="space-y-3 p-4 bg-slate-50 border border-slate-100 rounded-lg">
                  <h4 className="font-black text-slate-900 uppercase text-[10px] tracking-wider border-b pb-1.5 mb-1.5">
                    Basic Foundation Specs
                  </h4>
                  <p>
                    <strong className="text-slate-500 font-bold">Property Title:</strong> {formData.title || "Not defined"}
                  </p>
                  <p>
                    <strong className="text-slate-500 font-bold">Type:</strong> {formData.type} ({formData.purpose === "buy" ? "For Sale" : "For Rent"})
                  </p>
                  <p>
                    <strong className="text-slate-500 font-bold">Price Requested:</strong> ₹{(formData.price || 0).toLocaleString("en-IN")}
                  </p>
                  <p>
                    <strong className="text-slate-500 font-bold">Location:</strong> {formData.locality}, {formData.city}
                  </p>
                  {formData.type !== "Plot" && (
                    <p>
                      <strong className="text-slate-500 font-bold">BHK Dimensions:</strong> {formData.bedrooms} BHK / {formData.bathrooms} Baths · {formData.areaSqFt} SqFt
                    </p>
                  )}
                </div>

                {/* Verification Review Panel */}
                <div className="space-y-3 p-4 bg-slate-50 border border-slate-100 rounded-lg">
                  <h4 className="font-black text-slate-900 uppercase text-[10px] tracking-wider border-b pb-1.5 mb-1.5">
                    Tamil Nadu Legal Status
                  </h4>
                  <p>
                    <strong className="text-slate-500 font-bold">Land Registry Patta Index:</strong> {formData.pattaNumber || "None Provided"}
                  </p>
                  <p>
                    <strong className="text-slate-500 font-bold">RERA License:</strong> {formData.reraNumber || "N/A"} ({formData.isRERAApproved ? "Approved" : "Pending Approval"})
                  </p>
                  <p>
                    <strong className="text-slate-500 font-bold">DTCP / CMDA File Index:</strong> {formData.cmdaStatus || "N/A"}
                  </p>
                  <p>
                    <strong className="text-slate-500 font-bold">Municipal Resources:</strong> {formData.waterAvailability} · {formData.ebConnection}
                  </p>
                  <p>
                    <strong className="text-slate-500 font-bold">Vaastu Compliant:</strong> {formData.isVaastuCompliant ? "Yes" : "No"} · <strong className="text-slate-500 font-bold">Flood Safe:</strong> {formData.isFloodSafe ? "Verified Safe" : "Risk Zone"}
                  </p>
                </div>
              </div>

              {/* Images preview row */}
              {watchedImages.length > 0 && (
                <div className="p-4 border border-slate-100 rounded-lg bg-slate-50/50 space-y-2">
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-wider">Gallery Assets</span>
                  <div className="flex gap-3 overflow-x-auto py-1">
                    {watchedImages.map((url: string, index: number) => (
                      <img
                        key={index}
                        src={url}
                        alt="Final preview"
                        className="size-14 rounded border border-slate-200 object-cover shrink-0"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Stepper Navigation buttons */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-6">
            {currentStep > 1 ? (
              <Button
                type="button"
                onClick={onPrevStep}
                variant="outline"
                className="text-xs font-bold text-slate-600 border-slate-200 bg-white"
              >
                <ArrowLeft className="size-4 mr-1.5" /> Back
              </Button>
            ) : (
              <div />
            )}

            {currentStep < 5 ? (
              <Button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold"
              >
                Continue <ArrowRight className="size-4 ml-1.5" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={onSubmitAll}
                className="bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold border border-[#C9A84C]"
              >
                Submit Listing to Council <CheckCircle className="size-4 ml-1.5" />
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}
