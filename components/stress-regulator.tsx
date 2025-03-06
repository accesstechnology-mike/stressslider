"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useLocalStorage } from "@/lib/use-local-storage"

export default function StressRegulator() {
  const [stressLevel, setStressLevel] = useState<number>(5)
  const [activeTab, setActiveTab] = useState<string>("1-3")

  // Initialize strategies with default values
  const [lowStressStrategies, setLowStressStrategies] = useLocalStorage<string[]>("lowStressStrategies", [
    "Take deep breaths for 2 minutes",
    "Count to 10 slowly",
    "Notice 5 things I can see around me",
    "Stretch my arms and legs",
  ])

  const [mediumStressStrategies, setMediumStressStrategies] = useLocalStorage<string[]>("mediumStressStrategies", [
    "Take a short walk",
    "Listen to calming music",
    "Use a fidget toy",
    "Talk to someone I trust",
  ])

  const [highStressStrategies, setHighStressStrategies] = useLocalStorage<string[]>("highStressStrategies", [
    "Find a quiet space",
    "Use my breathing technique",
    "Apply deep pressure (weighted blanket)",
    "Use my emergency contact",
  ])

  // Update active tab based on stress level
  useEffect(() => {
    if (stressLevel >= 1 && stressLevel <= 3) {
      setActiveTab("1-3")
    } else if (stressLevel >= 4 && stressLevel <= 6) {
      setActiveTab("4-6")
    } else {
      setActiveTab("7-9")
    }
  }, [stressLevel])

  // Get the appropriate strategies based on stress level
  const getStrategies = () => {
    if (stressLevel >= 1 && stressLevel <= 3) {
      return lowStressStrategies
    } else if (stressLevel >= 4 && stressLevel <= 6) {
      return mediumStressStrategies
    } else {
      return highStressStrategies
    }
  }

  // Get color based on stress level
  const getColor = () => {
    if (stressLevel >= 1 && stressLevel <= 3) {
      return "bg-gradient-to-r from-green-300 to-green-500"
    } else if (stressLevel >= 4 && stressLevel <= 6) {
      return "bg-gradient-to-r from-yellow-300 to-yellow-500"
    } else {
      return "bg-gradient-to-r from-red-400 to-red-600"
    }
  }

  // Get zone name based on stress level
  const getZoneName = () => {
    if (stressLevel >= 1 && stressLevel <= 3) {
      return "Green Zone (Calm)"
    } else if (stressLevel >= 4 && stressLevel <= 6) {
      return "Yellow Zone (Elevated)"
    } else {
      return "Red Zone (High)"
    }
  }

  // Handle strategy editing
  const handleEditStrategies = (zone: string, newStrategies: string[]) => {
    if (zone === "1-3") {
      setLowStressStrategies(newStrategies)
    } else if (zone === "4-6") {
      setMediumStressStrategies(newStrategies)
    } else {
      setHighStressStrategies(newStrategies)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl">My Stress Level</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current stress level indicator */}
          <div className="text-center">
            <div className={`text-xl md:text-2xl font-bold py-3 px-6 rounded-lg inline-block ${getColor()}`}>
              {getZoneName()}
            </div>
          </div>

          {/* Stress level slider */}
          <div className="py-6">
            <div className="relative">
              <Slider
                value={[stressLevel]}
                min={1}
                max={9}
                step={1}
                onValueChange={(value) => setStressLevel(value[0])}
                aria-label="Stress level"
                className="pt-4"
                style={{
                  background: "linear-gradient(to right, #4ade80, #facc15, #f87171)",
                }}
              />
              <div className="flex justify-between mt-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <div key={num} className="flex flex-col items-center">
                    <span className="w-1 h-3 bg-gray-400" />
                    <span className="sr-only">{num}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Strategies section */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="1-3" className="data-[state=active]:bg-green-100">
                Green Zone
              </TabsTrigger>
              <TabsTrigger value="4-6" className="data-[state=active]:bg-yellow-100">
                Yellow Zone
              </TabsTrigger>
              <TabsTrigger value="7-9" className="data-[state=active]:bg-red-100">
                Red Zone
              </TabsTrigger>
            </TabsList>

            {/* Low stress strategies (1-3) */}
            <TabsContent value="1-3" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-green-700">Green Zone Strategies</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {lowStressStrategies.map((strategy, index) => (
                      <li key={index} className="p-3 bg-green-50 rounded-md border border-green-100">
                        {strategy}
                      </li>
                    ))}
                  </ul>
                  <StrategyEditor
                    zone="1-3"
                    strategies={lowStressStrategies}
                    onSave={(newStrategies) => handleEditStrategies("1-3", newStrategies)}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Medium stress strategies (4-6) */}
            <TabsContent value="4-6" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-yellow-700">Yellow Zone Strategies</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {mediumStressStrategies.map((strategy, index) => (
                      <li key={index} className="p-3 bg-yellow-50 rounded-md border border-yellow-100">
                        {strategy}
                      </li>
                    ))}
                  </ul>
                  <StrategyEditor
                    zone="4-6"
                    strategies={mediumStressStrategies}
                    onSave={(newStrategies) => handleEditStrategies("4-6", newStrategies)}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* High stress strategies (7-9) */}
            <TabsContent value="7-9" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-red-700">Red Zone Strategies</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {highStressStrategies.map((strategy, index) => (
                      <li key={index} className="p-3 bg-red-50 rounded-md border border-red-100">
                        {strategy}
                      </li>
                    ))}
                  </ul>
                  <StrategyEditor
                    zone="7-9"
                    strategies={highStressStrategies}
                    onSave={(newStrategies) => handleEditStrategies("7-9", newStrategies)}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

// Component for editing strategies
function StrategyEditor({
  zone,
  strategies,
  onSave,
}: {
  zone: string
  strategies: string[]
  onSave: (strategies: string[]) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [editedStrategies, setEditedStrategies] = useState<string[]>([])

  // Initialize edited strategies when dialog opens
  useEffect(() => {
    if (isOpen) {
      setEditedStrategies([...strategies])
    }
  }, [isOpen, strategies])

  // Handle strategy change
  const handleStrategyChange = (index: number, value: string) => {
    const newStrategies = [...editedStrategies]
    newStrategies[index] = value
    setEditedStrategies(newStrategies)
  }

  // Handle save
  const handleSave = () => {
    onSave(editedStrategies.filter((strategy) => strategy.trim() !== ""))
    setIsOpen(false)
  }

  // Add new strategy
  const addStrategy = () => {
    setEditedStrategies([...editedStrategies, ""])
  }

  // Remove strategy
  const removeStrategy = (index: number) => {
    const newStrategies = [...editedStrategies]
    newStrategies.splice(index, 1)
    setEditedStrategies(newStrategies)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full mt-4">
          Edit Strategies
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Edit Strategies for {zone === "1-3" ? "Green Zone" : zone === "4-6" ? "Yellow Zone" : "Red Zone"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto p-1">
          {editedStrategies.map((strategy, index) => (
            <div key={index} className="flex items-start gap-2">
              <Textarea
                value={strategy}
                onChange={(e) => handleStrategyChange(index, e.target.value)}
                placeholder="Enter a strategy..."
                className="flex-1"
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeStrategy(index)}
                aria-label="Remove strategy"
              >
                ✕
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={addStrategy} className="w-full">
            Add Strategy
          </Button>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

