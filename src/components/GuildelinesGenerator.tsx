"use client";

import { useState, type ChangeEvent, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { ClipboardCopy, Download, ListChecks, Lightbulb, Loader2, AlertTriangle, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { generateCommunityRulesFromTags } from "@/ai/flows/generate-community-rules";
import { generateCommunityRules } from "@/ai/flows/generate-community-rules-from-prompt";
import { Separator } from "./ui/separator";

const predefinedTagsList = [
  "Gaming", "Professional Network", "Family Friendly", "Marketplace", 
  "Support Group", "Educational Forum", "Creative Showcase", "Tech Discussion", 
  "Local Community", "Hobby Club", "Book Club", "Fitness & Wellness"
];

const tagsFormSchema = z.object({
  selectedPredefinedTags: z.array(z.string()).optional(),
});

const promptFormSchema = z.object({
  customPrompt: z.string().min(10, { message: "Prompt must be at least 10 characters." }),
});

type TagsFormValues = z.infer<typeof tagsFormSchema>;
type PromptFormValues = z.infer<typeof promptFormSchema>;

export default function GuildelinesGenerator() {
  const [generatedRules, setGeneratedRules] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { toast } = useToast();

  const tagsForm = useForm<TagsFormValues>({
    resolver: zodResolver(tagsFormSchema),
    defaultValues: {
      selectedPredefinedTags: [],
    },
  });

  const promptForm = useForm<PromptFormValues>({
    resolver: zodResolver(promptFormSchema),
    defaultValues: {
      customPrompt: "",
    },
  });
  
  // Effect to synchronise local selectedTags state with form state for visual feedback if needed
  useEffect(() => {
    setSelectedTags(tagsForm.watch("selectedPredefinedTags") || []);
  }, [tagsForm.watch("selectedPredefinedTags")]);


  const handleToggleTag = (tag: string) => {
    const currentSelected = tagsForm.getValues("selectedPredefinedTags") || [];
    const newSelected = currentSelected.includes(tag)
      ? currentSelected.filter(t => t !== tag)
      : [...currentSelected, tag];
    tagsForm.setValue("selectedPredefinedTags", newSelected, { shouldValidate: true });
  };

  const onGenerateWithTags = async () => {
    if (selectedTags.length === 0) {
      toast({
        variant: "destructive",
        title: "No Tags Selected",
        description: "Please select at least one tag to generate rules.",
      });
      return;
    }
    setIsLoading(true);
    setGeneratedRules("");
    try {
      const result = await generateCommunityRulesFromTags({ tags: selectedTags });
      setGeneratedRules(result.rules);
      toast({
        title: "Rules Generated!",
        description: "Review and customize your new community guidelines.",
      });
    } catch (error) {
      console.error("Error generating rules from tags:", error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "Could not generate rules. Please try again.",
      });
    }
    setIsLoading(false);
  };

  const onGenerateWithPrompt = async (data: PromptFormValues) => {
    setIsLoading(true);
    setGeneratedRules("");
    try {
      const result = await generateCommunityRules({ prompt: data.customPrompt });
      setGeneratedRules(result.rules);
      toast({
        title: "Rules Generated!",
        description: "Review and customize your new community guidelines.",
      });
    } catch (error) {
      console.error("Error generating rules from prompt:", error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "Could not generate rules. Please try again.",
      });
    }
    setIsLoading(false);
  };

  const handleRuleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setGeneratedRules(event.target.value);
  };

  const handleCopyToClipboard = () => {
    if (!generatedRules) {
      toast({
        variant: "destructive",
        title: "Nothing to Copy",
        description: "Generate some rules first!",
      });
      return;
    }
    navigator.clipboard.writeText(generatedRules);
    toast({
      title: "Rules Copied!",
      description: "Guidelines copied to your clipboard.",
    });
  };

  const handleDownloadMarkdown = () => {
    if (!generatedRules) {
      toast({
        variant: "destructive",
        title: "Nothing to Download",
        description: "Generate some rules first!",
      });
      return;
    }
    const markdownContent = `# Community Guidelines

## Our Rules
${generatedRules.split('\n').map(rule => `- ${rule}`).join('\n')}

---
*These rules were generated with Guildelines AI.*
`;
    const blob = new Blob([markdownContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "community-guidelines.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Markdown Downloaded!",
      description: "Your community guidelines are ready.",
    });
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-4xl">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-center">Create Your Community Guidelines</CardTitle>
          <CardDescription className="text-center">
            Use AI to generate a starting point for your community rules. Choose tags or describe your community.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tags" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="tags"><ListChecks className="mr-2 h-5 w-5" />Generate with Tags</TabsTrigger>
              <TabsTrigger value="inspire"><Lightbulb className="mr-2 h-5 w-5" />Inspire Me (Custom Prompt)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tags">
              <form onSubmit={tagsForm.handleSubmit(onGenerateWithTags)}>
                <div className="space-y-4">
                  <Label htmlFor="tags-selection" className="text-lg">Select Community Tags</Label>
                  <p className="text-sm text-muted-foreground">
                    Choose tags that best describe your community. The more relevant the tags, the better the generated rules.
                  </p>
                  <ScrollArea className="h-40 rounded-md border p-4">
                    <div className="flex flex-wrap gap-2">
                      {predefinedTagsList.map((tag) => (
                        <Badge
                          key={tag}
                          variant={selectedTags.includes(tag) ? "default" : "secondary"}
                          onClick={() => handleToggleTag(tag)}
                          className="cursor-pointer px-3 py-1.5 text-sm transition-all hover:shadow-md"
                          role="checkbox"
                          aria-checked={selectedTags.includes(tag)}
                          tabIndex={0}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleToggleTag(tag); }}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </ScrollArea>
                   {selectedTags.length > 0 && (
                     <p className="text-xs text-muted-foreground">Selected: {selectedTags.join(', ')}</p>
                   )}
                  <Button type="submit" className="w-full" disabled={isLoading || selectedTags.length === 0}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    Generate with Tags
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="inspire">
              <form onSubmit={promptForm.handleSubmit(onGenerateWithPrompt)} className="space-y-4">
                <div>
                  <Label htmlFor="customPrompt" className="text-lg">Describe Your Community</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Provide a detailed description of your community (e.g., "A friendly Minecraft server for families" or "A professional network for web developers").
                  </p>
                  <Controller
                    name="customPrompt"
                    control={promptForm.control}
                    render={({ field }) => (
                      <Textarea
                        id="customPrompt"
                        placeholder="e.g., A welcoming online space for amateur photographers to share tips and critiques..."
                        rows={5}
                        className="resize-none"
                        {...field}
                        disabled={isLoading}
                      />
                    )}
                  />
                  {promptForm.formState.errors.customPrompt && (
                    <p className="text-sm text-destructive mt-1">{promptForm.formState.errors.customPrompt.message}</p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                  Generate with Prompt
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <Separator className="my-8" />

          <div className="space-y-4">
            <Label htmlFor="generatedRules" className="text-lg">Generated Rules</Label>
            <p className="text-sm text-muted-foreground">
              Review, edit, and refine the AI-generated rules below. Remember, these are a starting point!
            </p>
            {isLoading && (
              <div className="flex items-center justify-center h-48 border rounded-md">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-2 text-muted-foreground">Generating rules...</p>
              </div>
            )}
            {!isLoading && !generatedRules && (
               <div className="flex flex-col items-center justify-center h-48 border border-dashed rounded-md p-4 text-center">
                <ListChecks className="h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Your generated community guidelines will appear here.</p>
                <p className="text-xs text-muted-foreground mt-1">Select tags or use a prompt to get started.</p>
              </div>
            )}
            {!isLoading && generatedRules && (
              <Textarea
                id="generatedRules"
                value={generatedRules}
                onChange={handleRuleChange}
                placeholder="AI-generated rules will appear here..."
                rows={15}
                className="resize-y min-h-[200px] p-4 text-sm leading-relaxed bg-card focus:ring-2 focus:ring-primary"
                aria-label="Generated community rules editor"
              />
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-end gap-2 pt-6">
          <Button variant="outline" onClick={handleCopyToClipboard} disabled={!generatedRules || isLoading}>
            <ClipboardCopy className="mr-2 h-4 w-4" /> Copy Rules
          </Button>
          <Button onClick={handleDownloadMarkdown} disabled={!generatedRules || isLoading}>
            <Download className="mr-2 h-4 w-4" /> Download as Markdown
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
