"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ExternalLink, Edit, Trash2, TrendingUp, Users, Code, Award, Target, Eye } from "lucide-react"

interface BragCardProps {
  brag: {
    id: number
    title: string
    description: string
    impact: string
    category: string
    date: string
    proofs: string[]
    tags: string[]
  }
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

const categoryIcons = {
  Performance: TrendingUp,
  Leadership: Users,
  Mentorship: Award,
  "Quality Assurance": Target,
  Product: Eye,
  "Open Source": Code,
}

const categoryColors = {
  Performance: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  Leadership: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
  Mentorship: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "Quality Assurance": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  Product: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  "Open Source": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
}

export function BragCard({ brag, onEdit, onDelete }: BragCardProps) {
  const IconComponent = categoryIcons[brag.category as keyof typeof categoryIcons] || Target
  const categoryColor = categoryColors[brag.category as keyof typeof categoryColors] || "bg-gray-100 text-gray-800"

  return (
    <Card className="border-0 shadow-lg rounded-2xl bg-white dark:bg-slate-800 hover:shadow-xl transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700">
                <IconComponent className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
              <Badge className={`${categoryColor} border-0`}>{brag.category}</Badge>
              <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(brag.date).toLocaleDateString()}
              </div>
            </div>
            <CardTitle className="text-xl font-bold text-slate-900 dark:text-white mb-2">{brag.title}</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => onEdit?.(brag.id)}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl text-red-600 hover:text-red-700"
              onClick={() => onDelete?.(brag.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">What I did:</h4>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{brag.description}</p>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Impact:</h4>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{brag.impact}</p>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Proof:</h4>
          <div className="flex flex-wrap gap-2">
            {brag.proofs.map((proof, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                <ExternalLink className="w-3 h-3 mr-1" />
                {proof}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            {brag.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
