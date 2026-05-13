"use client"

import { useState } from "react"
import { ArrowRight, Plus, Filter, BookOpen, PenTool, Video, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { type Subject, type Resource, type ResourceType, resourceTypeLabels, resourceTypes } from "@/data/subjects-data"
import { useOmnischoolStore } from "@/lib/store"
import { AddResourceModal } from "./AddResourceModal"

// أيقونات أنواع الموارد
const resourceTypeIcons: Record<ResourceType, React.ReactNode> = {
  "ملخص": <FileText className="h-4 w-4" />,
  "تمرين": <PenTool className="h-4 w-4" />,
  "درس": <BookOpen className="h-4 w-4" />,
  "فيديو": <Video className="h-4 w-4" />,
}

// ألوان أنواع الموارد
const resourceTypeColorMap: Record<ResourceType, string> = {
  "ملخص": "bg-amber-100 text-amber-700 border-amber-200",
  "تمرين": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "درس": "bg-teal-100 text-teal-700 border-teal-200",
  "فيديو": "bg-rose-100 text-rose-700 border-rose-200",
}

interface SubjectResourceLibraryProps {
  subject: Subject
  onBack: () => void
}

export function SubjectResourceLibrary({ subject, onBack }: SubjectResourceLibraryProps) {
  const [activeFilter, setActiveFilter] = useState<ResourceType | "الكل">("الكل")
  const [showAddModal, setShowAddModal] = useState(false)

  // استخدام الموارد من المتجر (محفوظة في localStorage)
  const { getResourcesBySubject, addResource } = useOmnischoolStore()
  const resources = getResourcesBySubject(subject.id)

  const filteredResources = activeFilter === "الكل"
    ? resources
    : resources.filter((r) => r.type === activeFilter)

  const handleAddResource = (resource: Omit<Resource, "id" | "createdAt">) => {
    addResource(resource)
    setShowAddModal(false)
  }

  const Icon = subject.icon

  return (
    <div className="space-y-6">
      {/* رأس المكتبة */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
          >
            <ArrowRight className="ml-1 h-4 w-4" />
            رجوع
          </Button>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-emerald-800">{subject.name}</h2>
            <p className="text-xs text-gray-500">{subject.description}</p>
          </div>
        </div>

        <Button
          onClick={() => setShowAddModal(true)}
          className="bg-emerald-600 hover:bg-emerald-700"
          size="sm"
        >
          <Plus className="ml-1 h-4 w-4" />
          إضافة مورد
        </Button>
      </div>

      {/* نظام التصفية */}
      <div className="flex flex-wrap items-center gap-2">
        <Filter className="h-4 w-4 text-emerald-600" />
        <button
          onClick={() => setActiveFilter("الكل")}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
            activeFilter === "الكل"
              ? "bg-emerald-600 text-white"
              : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
          }`}
        >
          الكل
        </button>
        {resourceTypes.map((type) => (
          <button
            key={type}
            onClick={() => setActiveFilter(type)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
              activeFilter === type
                ? "bg-emerald-600 text-white"
                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            }`}
          >
            {resourceTypeIcons[type]}
            {resourceTypeLabels[type]}
          </button>
        ))}
      </div>

      {/* قائمة الموارد */}
      {filteredResources.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-emerald-200 bg-emerald-50/50 py-12 text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
            <BookOpen className="h-7 w-7" />
          </div>
          <p className="text-sm font-medium text-emerald-700">لا توجد موارد بعد</p>
          <p className="mt-1 text-xs text-emerald-500">
            اضغط على &quot;إضافة مورد&quot; لإضافة مورد جديد
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="group rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-emerald-200 hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant="outline"
                      className={`text-xs ${resourceTypeColorMap[resource.type]}`}
                    >
                      {resourceTypeIcons[resource.type]}
                      {resource.type}
                    </Badge>
                    <span className="text-xs text-gray-400">{resource.createdAt}</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm leading-tight">
                    {resource.title}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed line-clamp-2">
                    {resource.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* نافذة إضافة مورد */}
      <AddResourceModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        subjectId={subject.id}
        subjectName={subject.name}
        onAdd={handleAddResource}
      />
    </div>
  )
}
