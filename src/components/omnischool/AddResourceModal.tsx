"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  type Resource,
  type ResourceType,
  resourceTypes,
  subjects,
} from "@/data/subjects-data"

interface AddResourceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  subjectId: string
  subjectName: string
  onAdd: (resource: Omit<Resource, "id" | "createdAt">) => void
}

export function AddResourceModal({
  open,
  onOpenChange,
  subjectId,
  subjectName,
  onAdd,
}: AddResourceModalProps) {
  const [title, setTitle] = useState("")
  const [type, setType] = useState<ResourceType | "">("")
  const [description, setDescription] = useState("")
  const [url, setUrl] = useState("")
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjectId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !type) return

    onAdd({
      title: title.trim(),
      type: type as ResourceType,
      subjectId: selectedSubjectId,
      description: description.trim(),
      url: url.trim(),
    })

    // إعادة تعيين النموذج
    setTitle("")
    setType("")
    setDescription("")
    setUrl("")
    setSelectedSubjectId(subjectId)
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // إعادة تعيين عند الإغلاق
      setTitle("")
      setType("")
      setDescription("")
      setUrl("")
      setSelectedSubjectId(subjectId)
    }
    onOpenChange(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-emerald-800">إضافة مورد جديد</DialogTitle>
          <DialogDescription className="text-emerald-600">
            أضف مورد تعليمي جديد لمادة {subjectName}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* عنوان المورد */}
          <div className="space-y-2">
            <Label htmlFor="resource-title" className="text-emerald-800">
              عنوان المورد
            </Label>
            <Input
              id="resource-title"
              placeholder="أدخل عنوان المورد..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-emerald-200 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
              dir="rtl"
            />
          </div>

          {/* نوع المورد - قائمة منسدلة */}
          <div className="space-y-2">
            <Label className="text-emerald-800">نوع المورد</Label>
            <Select
              value={type}
              onValueChange={(val) => setType(val as ResourceType)}
              dir="rtl"
            >
              <SelectTrigger className="w-full border-emerald-200 focus:ring-emerald-500/20">
                <SelectValue placeholder="اختر نوع المورد..." />
              </SelectTrigger>
              <SelectContent dir="rtl">
                {resourceTypes.map((rt) => (
                  <SelectItem key={rt} value={rt}>
                    {rt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* المادة - قائمة منسدلة */}
          <div className="space-y-2">
            <Label className="text-emerald-800">المادة</Label>
            <Select
              value={selectedSubjectId}
              onValueChange={setSelectedSubjectId}
              dir="rtl"
            >
              <SelectTrigger className="w-full border-emerald-200 focus:ring-emerald-500/20">
                <SelectValue placeholder="اختر المادة..." />
              </SelectTrigger>
              <SelectContent dir="rtl">
                {subjects.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* الوصف */}
          <div className="space-y-2">
            <Label htmlFor="resource-description" className="text-emerald-800">
              الوصف
            </Label>
            <Textarea
              id="resource-description"
              placeholder="أدخل وصفاً للمورد..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[80px] border-emerald-200 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
              dir="rtl"
            />
          </div>

          {/* الرابط */}
          <div className="space-y-2">
            <Label htmlFor="resource-url" className="text-emerald-800">
              الرابط (اختياري)
            </Label>
            <Input
              id="resource-url"
              placeholder="https://..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="border-emerald-200 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
              dir="ltr"
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              disabled={!title.trim() || !type}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              إضافة
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
