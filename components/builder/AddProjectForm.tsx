"use client";

import React, { useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useBuilderFormStore } from "@/store/builderFormStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useDropzone } from "react-dropzone";
import {
  Hammer,
  ShieldCheck,
  CheckCircle,
  FileText,
  FileBadge,
  Sparkles,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Upload,
  Layers,
  Info,
  Droplet,
  Zap,
  Compass,
  Milestone,
  Grid
} from "lucide-react";

// 1. Zod Validation Schemas per step
const step1Schema = z.object({
  projectName: z.string().min(8, "Project name must be at least 8 characters").max(100, "Project name is too long"),
  reraId: z.string().min(10, "Valid RERA ID required for gated community submission"),
  totalUnits: z.preprocess((val) => Number(val), z.number().min(5, "Minimum units must be at least 5")),
  possessionDate: z.string().min(10, "Please provide possession target date"),
  projectType: z.string().min(1, "Select primary construction type"),
  priceMin: z.preprocess((val) => Number(val), z.number().min(100000, "Min price is ₹1L")),
  priceMax: z.preprocess((val) => Number(val), z.number().min(100000, "Max price is ₹1L")),
  city: z.string().min(1, "Select city"),
  locality: z.string().min(3, "Locality must be at least 3 characters"),
  areaRange: z.string().min(5, "e.g. 1200 - 3500 sqft"),
});

const step2Schema = z.object({
  isDTCPApproved: z.boolean().default(false),
  isCMDAApproved: z.boolean().default(false),
  cmdaStatus: z.string().default(""),
  pattaNumber: z.string().min(3, "Valid Patta/Chitta Registry index is required for land proof"),
  waterAvailability: z.string().min(1, "Water details are required"),
  ebConnection: z.string().min(1, "Electrical supply details are required"),
  isFloodSafe: z.boolean().default(true),
  isVaastuCompliant: z.boolean().default(true),
  roadWidth: z.string().min(1, "Road details are required"),
  drainage: z.string().min(1, "Drainage description is required"),
});

const step3Schema = z.object({
  description: z.string().min(30, "Detailed description (at least 30 characters) required"),
  amenities: z.array(z.string()).min(1, "Please select at least 1 luxury amenity"),
  status: z.enum(["Upcoming", "Under Construction", "Completed"]),
});

const AMENITIES_LIST = [
  "24/7 Security Gated",
  "Power Grid Backup",
  "Swimming Pool & Jacuzzi",
  "Premium Clubhouse",
  "Fully Equipped Gym",
  "Children's Play Enclave",
  "Rainwater Harvesting",
  "RO Water Treatment",
  "CCTV Covered",
  "Vaastu Compliant Plots",
  "Landscape Gardens",
  "Underground Drainage",
];

const SAMPLE_PROJECT_IMAGES = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
];

export default function AddProjectForm() {
  const { currentStep, formData, setStep, updateFormData, resetForm } = useBuilderFormStore();

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

  const watchedImages = watch("images") || [];
  const watchedFloorPlanName = watch("floorPlanName") || "";

  const onNextStep = (data: Record<string, unknown>) => {
    updateFormData(data);
    setStep(currentStep + 1);
  };

  const onPrevStep = () => {
    const currentValues = watch();
    updateFormData(currentValues);
    setStep(currentStep - 1);
  };

  const onSubmitAll = () => {
    const finalData = { ...formData, images: watchedImages, floorPlanName: watchedFloorPlanName };
    console.log("Submitting builder project payload:", finalData);
    alert(
      `Congratulations! Municipal verification request generated for project: ${finalData.projectName}. RERA ID: ${finalData.reraId}. Patta registry index: ${finalData.pattaNumber}.`
    );
    resetForm();
  };

  // Gallery Dropzone
  const onDropImages = useCallback(
    (acceptedFiles: File[]) => {
      const newUrls = acceptedFiles.map((file) => URL.createObjectURL(file));
      const updated = [...watchedImages, ...newUrls];
      setValue("images", updated, { shouldValidate: true });
      updateFormData({ images: updated });
    },
    [watchedImages, setValue, updateFormData]
  );

  const { getRootProps: getImgRoot, getInputProps: getImgInput, isDragActive: imgDrag } = useDropzone({
    onDrop: onDropImages,
    accept: { "image/*": [] },
    maxFiles: 5,
  });

  const removeImage = (index: number) => {
    const updated = watchedImages.filter((_: string, i: number) => i !== index);
    setValue("images", updated, { shouldValidate: true });
    updateFormData({ images: updated });
  };

  // Floor plan dropzone mock
  const onDropFloorPlan = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];
      setValue("floorPlanName", file.name, { shouldValidate: true });
      setValue("floorPlanUrl", "/mock/floor-plan-pdf-path.pdf");
      updateFormData({ floorPlanName: file.name, floorPlanUrl: "/mock/floor-plan-pdf-path.pdf" });
    },
    [setValue, updateFormData]
  );

  const { getRootProps: getFPRoot, getInputProps: getFPInput, isDragActive: fpDrag } = useDropzone({
    onDrop: onDropFloorPlan,
    accept: { "application/pdf": [] },
    maxFiles: 1,
  });

  const loadSampleAssets = () => {
    setValue("images", SAMPLE_PROJECT_IMAGES, { shouldValidate: true });
    setValue("floorPlanName", "Chola_Gated_Community_FloorPlan.pdf");
    setValue("floorPlanUrl", "/mock/Chola_Gated_Community_FloorPlan.pdf");
    updateFormData({
      images: SAMPLE_PROJECT_IMAGES,
      floorPlanName: "Chola_Gated_Community_FloorPlan.pdf",
      floorPlanUrl: "/mock/Chola_Gated_Community_FloorPlan.pdf",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-slate-100">
      {/* Header */}
      <div>
        <h1 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
          <Sparkles className="size-5.5 text-[#C9A84C]" /> Register Gated Community / Layout
        </h1>
        <p className="text-xs text-slate-400 font-semibold mt-0.5">
          Submit master township project parameters to verify compliance with CMDA / DTCP.
        </p>
      </div>

      {/* Luxurious Stepper */}
      <div className="grid grid-cols-5 gap-2 text-center select-none">
        {[
          { step: 1, label: "Basic Info", icon: Hammer },
          { step: 2, label: "TN Verification", icon: FileBadge },
          { step: 3, label: "Amenities", icon: Grid },
          { step: 4, label: "Layout PDF", icon: Upload },
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
                  ? "bg-[#111827] border-[#C9A84C] text-white shadow-md shadow-[#C9A84C]/5"
                  : isCompleted
                  ? "bg-emerald-950/20 border-emerald-900/30 text-emerald-400"
                  : "bg-[#0B0F19] border-slate-800 text-slate-500"
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

      {/* Form Content */}
      <Card className="bg-[#0B0F19] border-slate-800 shadow-xl p-6 md:p-8">
        <form onSubmit={handleSubmit(onNextStep)} className="space-y-6">
          {/* STEP 1: BASIC INFO */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in-50 duration-300">
              <div className="border-b border-slate-800 pb-3 flex items-center gap-2">
                <Hammer className="size-4.5 text-[#C9A84C]" />
                <h3 className="font-extrabold text-white text-sm">Step 1: Gated Community Core Details</h3>
              </div>

              {/* Project name input */}
              <div className="space-y-2">
                <Label htmlFor="projectName" className="text-xs font-bold text-slate-350">
                  Project / Township Name <span className="text-rose-500">*</span>
                </Label>
                <Input
                  id="projectName"
                  {...register("projectName")}
                  placeholder="e.g. Chola Royal Enclave Townships"
                  className={errors.projectName ? "border-rose-500 bg-rose-950/10 focus:border-rose-500 text-white" : "bg-[#070A13] border-slate-850 text-white"}
                />
                {errors.projectName && <p className="text-[10px] text-rose-500 font-bold">{errors.projectName.message as string}</p>}
              </div>

              {/* RERA and specs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reraId" className="text-xs font-bold text-slate-350">RERA Registry Number <span className="text-rose-500">*</span></Label>
                  <Input
                    id="reraId"
                    {...register("reraId")}
                    placeholder="e.g. TN/30/Building/0144/2025"
                    className={errors.reraId ? "border-rose-500 bg-rose-950/10 focus:border-rose-500 font-mono" : "bg-[#070A13] border-slate-850 font-mono text-white"}
                  />
                  {errors.reraId && <p className="text-[10px] text-rose-500 font-bold">{errors.reraId.message as string}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalUnits" className="text-xs font-bold text-slate-350">Total Residential Units <span className="text-rose-500">*</span></Label>
                  <Input
                    id="totalUnits"
                    type="number"
                    {...register("totalUnits")}
                    placeholder="e.g. 180"
                    className={errors.totalUnits ? "border-rose-500 bg-rose-50/10 focus:border-rose-500" : "bg-[#070A13] border-slate-850 text-white"}
                  />
                  {errors.totalUnits && <p className="text-[10px] text-rose-500 font-bold">{errors.totalUnits.message as string}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="possessionDate" className="text-xs font-bold text-slate-350">Possession Timeline <span className="text-rose-500">*</span></Label>
                  <Input
                    id="possessionDate"
                    type="date"
                    {...register("possessionDate")}
                    className={errors.possessionDate ? "border-rose-500 bg-rose-50/10 focus:border-rose-500" : "bg-[#070A13] border-slate-850 text-white"}
                  />
                  {errors.possessionDate && <p className="text-[10px] text-rose-500 font-bold">{errors.possessionDate.message as string}</p>}
                </div>
              </div>

              {/* Type and Prices */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="projectType" className="text-xs font-bold text-slate-350">Primary Project Category</Label>
                  <select
                    id="projectType"
                    {...register("projectType")}
                    className="w-full bg-[#070A13] border border-slate-850 rounded-lg py-2 px-3 text-xs text-slate-300 focus:outline-none focus:border-slate-700 h-9"
                  >
                    <option value="Apartment">Luxury Gated Highrise (Apartment)</option>
                    <option value="Villa">Premium Villa Enclave (Villa)</option>
                    <option value="Plot">Residential Land Layout (Plot)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priceMin" className="text-xs font-bold text-slate-350">Min Price (INR ₹) <span className="text-rose-500">*</span></Label>
                  <Input
                    id="priceMin"
                    type="number"
                    {...register("priceMin")}
                    placeholder="e.g. 8500000"
                    className="bg-[#070A13] border-slate-850 text-white"
                  />
                  {errors.priceMin && <p className="text-[10px] text-rose-500 font-bold">{errors.priceMin.message as string}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priceMax" className="text-xs font-bold text-slate-350">Max Price (INR ₹) <span className="text-rose-500">*</span></Label>
                  <Input
                    id="priceMax"
                    type="number"
                    {...register("priceMax")}
                    placeholder="e.g. 16000000"
                    className="bg-[#070A13] border-slate-850 text-white"
                  />
                  {errors.priceMax && <p className="text-[10px] text-rose-500 font-bold">{errors.priceMax.message as string}</p>}
                </div>
              </div>

              {/* Area & Location */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-xs font-bold text-slate-350">City in Tamil Nadu</Label>
                  <select
                    id="city"
                    {...register("city")}
                    className="w-full bg-[#070A13] border border-slate-850 rounded-lg py-2 px-3 text-xs text-slate-300 focus:outline-none focus:border-slate-700 h-9"
                  >
                    <option value="Coimbatore">Coimbatore</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Madurai">Madurai</option>
                    <option value="Trichy">Trichy</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="locality" className="text-xs font-bold text-slate-350">Locality Area Name <span className="text-rose-500">*</span></Label>
                  <Input
                    id="locality"
                    {...register("locality")}
                    placeholder="e.g. Ramanathapuram"
                    className="bg-[#070A13] border-slate-850 text-white"
                  />
                  {errors.locality && <p className="text-[10px] text-rose-500 font-bold">{errors.locality.message as string}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="areaRange" className="text-xs font-bold text-slate-350">Built Area Range <span className="text-rose-500">*</span></Label>
                  <Input
                    id="areaRange"
                    {...register("areaRange")}
                    placeholder="e.g. 1200 - 3500 sqft"
                    className="bg-[#070A13] border-slate-850 text-white"
                  />
                  {errors.areaRange && <p className="text-[10px] text-rose-500 font-bold">{errors.areaRange.message as string}</p>}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: TAMIL NADU DETAILS */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in-50 duration-300">
              <div className="border-b border-slate-800 pb-3 flex items-center gap-2">
                <FileBadge className="size-4.5 text-[#C9A84C]" />
                <h3 className="font-extrabold text-white text-sm">Step 2: Municipal Approvals Registry</h3>
              </div>

              {/* Compliance toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#070A13] border border-slate-850 p-3 rounded-lg flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-300">DTCP Clearance</span>
                    <span className="text-[9px] text-slate-500">Directorate of Town & Country Planning</span>
                  </div>
                  <Controller
                    name="isDTCPApproved"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-slate-800 data-[state=checked]:bg-[#C9A84C] data-[state=checked]:text-[#070A13]"
                      />
                    )}
                  />
                </div>

                <div className="bg-[#070A13] border border-slate-850 p-3 rounded-lg flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-300">CMDA Clearance</span>
                    <span className="text-[9px] text-slate-500">Chennai Metro Dev Authority</span>
                  </div>
                  <Controller
                    name="isCMDAApproved"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-slate-800 data-[state=checked]:bg-[#C9A84C] data-[state=checked]:text-[#070A13]"
                      />
                    )}
                  />
                </div>
              </div>

              {/* Files Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cmdaStatus" className="text-xs font-bold text-slate-350">CMDA / DTCP Clearance File Reference</Label>
                  <Input
                    id="cmdaStatus"
                    {...register("cmdaStatus")}
                    placeholder="e.g. L.P / CMDA / No. 34 / 2025"
                    className="bg-[#070A13] border-slate-850 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pattaNumber" className="text-xs font-bold text-slate-350">
                    Master Land Patta Index <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="pattaNumber"
                    {...register("pattaNumber")}
                    placeholder="e.g. Master Survey 118/3A, Patta 4890"
                    className={errors.pattaNumber ? "border-rose-500 bg-rose-955/10 focus:border-rose-500" : "bg-[#070A13] border-slate-850 text-white"}
                  />
                  {errors.pattaNumber && <p className="text-[10px] text-rose-500 font-bold">{errors.pattaNumber.message as string}</p>}
                </div>
              </div>

              {/* Water, electricity infrastructure */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="waterAvailability" className="text-xs font-bold text-slate-350 flex items-center gap-1">
                    <Droplet className="size-3.5 text-blue-400 shrink-0" /> Water Grid Source
                  </Label>
                  <select
                    id="waterAvailability"
                    {...register("waterAvailability")}
                    className="w-full bg-[#070A13] border border-slate-850 rounded-lg py-2 px-3 text-xs text-slate-300 focus:outline-none focus:border-slate-700 h-9"
                  >
                    <option value="Siruvani & Borewell">Siruvani Corporation Connection & Borewell</option>
                    <option value="Metro Water Hybrid">Metro Water & Industrial Borewells</option>
                    <option value="Cauvery Water Grid">Cauvery Water Grid Supply</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ebConnection" className="text-xs font-bold text-[#C9A84C] flex items-center gap-1">
                    <Zap className="size-3.5 shrink-0" /> TNEB High-Tension Substation connection
                  </Label>
                  <select
                    id="ebConnection"
                    {...register("ebConnection")}
                    className="w-full bg-[#070A13] border border-slate-850 rounded-lg py-2 px-3 text-xs text-slate-300 focus:outline-none focus:border-slate-700 h-9"
                  >
                    <option value="3 Phase Connection">3 Phase Dedicated Transformer (TNEB)</option>
                    <option value="Commercial HT Connection">Dedicated HT Commercial Grid line</option>
                  </select>
                </div>
              </div>

              {/* Facing road & drainage */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="roadWidth" className="text-xs font-bold text-slate-350 flex items-center gap-1">
                    <Milestone className="size-3.5 text-slate-500 shrink-0" /> Approach Road width
                  </Label>
                  <Input
                    id="roadWidth"
                    {...register("roadWidth")}
                    placeholder="e.g. 40 Feet Blacktop Tar Road"
                    className="bg-[#070A13] border-slate-850 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="drainage" className="text-xs font-bold text-slate-350 flex items-center gap-1">
                    <Compass className="size-3.5 text-slate-500 shrink-0" /> Master Stormwater Drainage
                  </Label>
                  <Input
                    id="drainage"
                    {...register("drainage")}
                    placeholder="e.g. Underground Stormwater & Sewer System"
                    className="bg-[#070A13] border-slate-850 text-white"
                  />
                </div>
              </div>

              {/* Flood compliant */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#070A13] border border-slate-850 p-3 rounded-lg flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
                      <ShieldCheck className="size-3.5 text-emerald-500" /> Flood Resilience
                    </span>
                    <span className="text-[9px] text-slate-500">Elevated layout approved safe</span>
                  </div>
                  <Controller
                    name="isFloodSafe"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-slate-800 data-[state=checked]:bg-[#C9A84C] data-[state=checked]:text-[#070A13]"
                      />
                    )}
                  />
                </div>

                <div className="bg-[#070A13] border border-slate-850 p-3 rounded-lg flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
                      <Compass className="size-3.5 text-slate-500" /> Vaastu Plan
                    </span>
                    <span className="text-[9px] text-slate-500">Master layout compliant directions</span>
                  </div>
                  <Controller
                    name="isVaastuCompliant"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-slate-800 data-[state=checked]:bg-[#C9A84C] data-[state=checked]:text-[#070A13]"
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: AMENITIES CHECKLIST */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in-50 duration-300">
              <div className="border-b border-slate-800 pb-3 flex items-center gap-2">
                <FileText className="size-4.5 text-slate-500" />
                <h3 className="font-extrabold text-white text-sm">Step 3: Marketing Highlights & Amenities Checklist</h3>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status" className="text-xs font-bold text-slate-350">Developer Launch status</Label>
                <select
                  id="status"
                  {...register("status")}
                  className="w-full bg-[#070A13] border border-slate-850 rounded-lg py-2 px-3 text-xs text-slate-350 focus:outline-none h-9"
                >
                  <option value="Under Construction">Under Construction (Active Development)</option>
                  <option value="Upcoming">Upcoming (Pre-Launch booking)</option>
                  <option value="Completed">Completed (Ready for Possession)</option>
                </select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-xs font-bold text-slate-350">
                  Detailed Project Highlights <span className="text-rose-500">*</span>
                </Label>
                <textarea
                  id="description"
                  {...register("description")}
                  rows={5}
                  placeholder="Elaborate on master plan designs, architectural specs, local connectivity (e.g. proximity to airports, IT parks), and verification certificates..."
                  className={`w-full bg-[#070A13] border rounded-lg py-2 px-3 text-xs text-slate-350 focus:outline-none focus:border-slate-700 transition-colors ${
                    errors.description ? "border-rose-500 bg-rose-950/10 focus:border-rose-500" : "border-slate-850"
                  }`}
                />
                {errors.description && <p className="text-[10px] text-rose-500 font-bold">{errors.description.message as string}</p>}
              </div>

              {/* Checklist */}
              <div className="space-y-2.5">
                <Label className="text-xs font-bold text-slate-350">
                  Select Gated Township Amenities <span className="text-rose-500">*</span>
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
                                className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-bold cursor-pointer transition-all ${
                                  isChecked
                                    ? "bg-[#C9A84C] border-[#C9A84C] text-[#070A13] shadow-xs font-black"
                                    : "bg-[#070A13] border-slate-850 text-slate-400 hover:bg-[#111827] hover:text-white"
                                }`}
                              >
                                <Checkbox
                                  checked={isChecked}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...selected, amenity]);
                                    } else {
                                      field.onChange(selected.filter((i: string) => i !== amenity));
                                    }
                                  }}
                                  className="sr-only"
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

          {/* STEP 4: LAYOUTS PDF & BULK GALLERY */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in-50 duration-300">
              <div className="border-b border-slate-800 pb-3 flex items-center gap-2">
                <Upload className="size-4.5 text-slate-500" />
                <h3 className="font-extrabold text-white text-sm">Step 4: Layouts PDF & Project Renders</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 3D Rendering images */}
                <div className="space-y-3">
                  <Label className="text-xs font-bold text-slate-350">Township 3D Render Gallery</Label>
                  <div
                    {...getImgRoot()}
                    className={`border border-dashed rounded-lg p-5 text-center cursor-pointer transition-all ${
                      imgDrag ? "border-[#C9A84C] bg-amber-500/5" : "border-slate-800 hover:border-slate-700 bg-[#070A13]"
                    }`}
                  >
                    <input {...getImgInput()} />
                    <Upload className="size-6 text-slate-600 mx-auto mb-1 animate-bounce" />
                    <p className="text-[10px] font-bold text-slate-400">Drag 3D Renders / Photos</p>
                    <p className="text-[8px] text-slate-500">Max 5 photos (JPG, PNG)</p>
                  </div>

                  {/* image list */}
                  {watchedImages.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {watchedImages.map((url: string, idx: number) => (
                        <div key={idx} className="relative size-12 rounded border border-slate-800 overflow-hidden">
                          <img src={url} alt="render preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute top-0 right-0 size-3.5 bg-black/60 hover:bg-rose-600 rounded text-white flex items-center justify-center"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Floor Plan PDF */}
                <div className="space-y-3">
                  <Label className="text-xs font-bold text-slate-350">Gated Layout / Floor Plan PDF</Label>
                  <div
                    {...getFPRoot()}
                    className={`border border-dashed rounded-lg p-5 text-center cursor-pointer transition-all ${
                      fpDrag ? "border-[#C9A84C] bg-amber-500/5" : "border-slate-800 hover:border-slate-700 bg-[#070A13]"
                    }`}
                  >
                    <input {...getFPInput()} />
                    <Upload className="size-6 text-slate-600 mx-auto mb-1 animate-bounce" />
                    <p className="text-[10px] font-bold text-slate-400">Drag Layout Blueprint (PDF)</p>
                    <p className="text-[8px] text-slate-500">Official Municipal Cleared plan</p>
                  </div>

                  {watchedFloorPlanName && (
                    <div className="p-2.5 bg-[#070A13] border border-slate-850 rounded text-[10px] font-bold text-slate-300 flex items-center gap-1.5">
                      <FileText className="size-4 text-[#C9A84C] shrink-0" />
                      <span className="truncate flex-1">{watchedFloorPlanName}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={loadSampleAssets}
                  className="text-[10px] text-[#C9A84C] font-bold hover:underline"
                >
                  Load Mock Gated Render files
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: REVIEW & CONFIRM */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-in fade-in-50 duration-300">
              <div className="border-b border-slate-800 pb-3 flex items-center gap-2">
                <CheckCircle className="size-4.5 text-emerald-500" />
                <h3 className="font-extrabold text-white text-sm">Step 5: Municipal Review Submission</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
                {/* Core specifications */}
                <div className="space-y-3 p-4 bg-[#070A13] border border-slate-850 rounded-lg">
                  <h4 className="font-black text-[#C9A84C] uppercase text-[10px] tracking-wider border-b border-slate-850 pb-1.5 mb-1.5">
                    Township Core Specs
                  </h4>
                  <p>
                    <strong className="text-slate-500 font-bold">Project Name:</strong> {formData.projectName || "Undefined"}
                  </p>
                  <p>
                    <strong className="text-slate-500 font-bold">RERA Registration:</strong> {formData.reraId}
                  </p>
                  <p>
                    <strong className="text-slate-500 font-bold">Category:</strong> {formData.projectType} ({formData.status})
                  </p>
                  <p>
                    <strong className="text-slate-500 font-bold">Units Planned:</strong> {formData.totalUnits} Residential Units
                  </p>
                  <p>
                    <strong className="text-slate-500 font-bold">Price Bounds:</strong> {formData.priceMin.toLocaleString()} - {formData.priceMax.toLocaleString()} INR
                  </p>
                  <p>
                    <strong className="text-slate-500 font-bold">Dimensions:</strong> {formData.areaRange} sqft
                  </p>
                </div>

                {/* Approvals verification */}
                <div className="space-y-3 p-4 bg-[#070A13] border border-slate-850 rounded-lg">
                  <h4 className="font-black text-[#C9A84C] uppercase text-[10px] tracking-wider border-b border-slate-850 pb-1.5 mb-1.5">
                    Municipal Approvals verification
                  </h4>
                  <p>
                    <strong className="text-slate-500 font-bold">Land Registry Patta Index:</strong> {formData.pattaNumber}
                  </p>
                  <p>
                    <strong className="text-slate-500 font-bold">CMDA / DTCP Clearance Number:</strong> {formData.cmdaStatus || "Pending"}
                  </p>
                  <p>
                    <strong className="text-slate-500 font-bold">Flood Safe clearance:</strong> {formData.isFloodSafe ? "Verified Elevate Safe" : "Pending Inspection"}
                  </p>
                  <p>
                    <strong className="text-slate-500 font-bold">Vaastu Compliant Layout:</strong> {formData.isVaastuCompliant ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong className="text-slate-500 font-bold">Infrastructure:</strong> {formData.waterAvailability} · {formData.ebConnection}
                  </p>
                </div>
              </div>

              {/* Renders previews */}
              {watchedImages.length > 0 && (
                <div className="p-4 bg-[#070A13] border border-slate-850 rounded-lg space-y-2">
                  <span className="text-[10px] font-black text-[#C9A84C] uppercase tracking-wider block">Gallery Renders</span>
                  <div className="flex gap-3 overflow-x-auto py-1">
                    {watchedImages.map((url: string, index: number) => (
                      <img
                        key={index}
                        src={url}
                        alt="Final review render"
                        className="size-14 rounded border border-slate-800 object-cover shrink-0 opacity-80"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Stepper Navigation */}
          <div className="flex items-center justify-between border-t border-slate-850 pt-6 bg-[#0B0F19]">
            {currentStep > 1 ? (
              <Button
                type="button"
                onClick={onPrevStep}
                variant="outline"
                className="text-xs font-bold text-slate-350 border-slate-800 bg-[#111827] hover:bg-slate-800"
              >
                <ArrowLeft className="size-4 mr-1.5" /> Back
              </Button>
            ) : (
              <div />
            )}

            {currentStep < 5 ? (
              <Button
                type="submit"
                className="bg-[#C9A84C] text-[#070A13] hover:bg-[#b0903c] text-xs font-black"
              >
                Continue <ArrowRight className="size-4 ml-1.5" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={onSubmitAll}
                className="bg-[#111827] text-white hover:bg-slate-800 border border-[#C9A84C]/50 text-xs font-bold"
              >
                Submit Project to Verification Board <CheckCircle className="size-4 ml-1.5" />
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}
