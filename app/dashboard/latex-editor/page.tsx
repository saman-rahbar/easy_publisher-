'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Play, 
  Download, 
  Save, 
  Eye, 
  Settings,
  Code,
  FileDown,
  FileUp,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react'
import { paperActions } from '@/lib/actions'

interface LaTeXDocument {
  id: string
  title: string
  content: string
  lastCompiled?: string
  compilationStatus: 'idle' | 'compiling' | 'success' | 'error'
  errorMessage?: string
  pdfUrl?: string
}

const defaultLaTeXTemplate = `\\documentclass[12pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{amsmath}
\\usepackage{amsfonts}
\\usepackage{amssymb}
\\usepackage{graphicx}
\\usepackage{geometry}
\\geometry{margin=1in}

\\title{Your Paper Title}
\\author{Your Name}
\\date{\\today}

\\begin{document}

\\maketitle

\\begin{abstract}
Your abstract goes here. This should provide a brief overview of your research and findings.
\\end{abstract}

\\section{Introduction}
Your introduction goes here. This section should provide background information and state your research objectives.

\\section{Methodology}
Describe your research methods and approach here.

\\section{Results}
Present your findings and results here.

\\section{Discussion}
Discuss the implications of your results and their significance.

\\section{Conclusion}
Summarize your main findings and their implications.

\\bibliographystyle{plain}
\\begin{thebibliography}{9}
\\bibitem{reference1}
Author, A. (Year). Title of the paper. Journal Name, Volume(Issue), Pages.
\\end{thebibliography}

\\end{document}`

export default function LaTeXEditorPage() {
  const [documents, setDocuments] = useState<LaTeXDocument[]>([
    {
      id: '1',
      title: 'Machine Learning Research Paper',
      content: defaultLaTeXTemplate,
      compilationStatus: 'idle'
    }
  ])
  const [currentDocument, setCurrentDocument] = useState<LaTeXDocument>(documents[0])
  const [isCompiling, setIsCompiling] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const handleCompile = async () => {
    if (!currentDocument) return
    
    setIsCompiling(true)
    setCurrentDocument(prev => ({ ...prev, compilationStatus: 'compiling' }))
    
    try {
      // Simulate LaTeX compilation
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Simulate successful compilation
      const updatedDoc = {
        ...currentDocument,
        compilationStatus: 'success' as const,
        lastCompiled: new Date().toISOString(),
        pdfUrl: '/api/generated-paper.pdf',
        errorMessage: undefined
      }
      
      setCurrentDocument(updatedDoc)
      setDocuments(prev => prev.map(doc => doc.id === currentDocument.id ? updatedDoc : doc))
      
      paperActions.compileLaTeX(currentDocument.id)
    } catch (error) {
      // Simulate compilation error
      const updatedDoc = {
        ...currentDocument,
        compilationStatus: 'error' as const,
        errorMessage: 'Compilation failed: Missing \\end{document} or syntax error'
      }
      
      setCurrentDocument(updatedDoc)
      setDocuments(prev => prev.map(doc => doc.id === currentDocument.id ? updatedDoc : doc))
    } finally {
      setIsCompiling(false)
    }
  }

  const handleSave = () => {
    if (!currentDocument) return
    
    const updatedDoc = {
      ...currentDocument,
      content: currentDocument.content
    }
    
    setDocuments(prev => prev.map(doc => doc.id === currentDocument.id ? updatedDoc : doc))
    paperActions.saveLaTeXDocument(currentDocument.id)
  }

  const handleNewDocument = () => {
    const newDoc: LaTeXDocument = {
      id: Date.now().toString(),
      title: 'New LaTeX Document',
      content: defaultLaTeXTemplate,
      compilationStatus: 'idle'
    }
    
    setDocuments(prev => [newDoc, ...prev])
    setCurrentDocument(newDoc)
  }

  const getCompilationStatusIcon = () => {
    switch (currentDocument?.compilationStatus) {
      case 'compiling':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Code className="h-4 w-4 text-gray-500" />
    }
  }

  const getCompilationStatusText = () => {
    switch (currentDocument?.compilationStatus) {
      case 'compiling':
        return 'Compiling...'
      case 'success':
        return 'Compiled successfully'
      case 'error':
        return 'Compilation failed'
      default:
        return 'Not compiled'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">LaTeX Editor</h1>
          <p className="text-muted-foreground">Create and compile academic manuscripts</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            onClick={handleNewDocument}
          >
            <FileText className="mr-2 h-4 w-4" />
            New Document
          </Button>
          <Button 
            className="btn-primary"
            onClick={handleCompile}
            disabled={isCompiling || !currentDocument}
          >
            {isCompiling ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Compiling...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Compile
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Document List */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Documents
            </CardTitle>
            <CardDescription>Your LaTeX manuscripts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors duration-200 ${
                    currentDocument?.id === doc.id 
                      ? 'border-primary bg-primary/5' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setCurrentDocument(doc)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{doc.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {doc.lastCompiled ? `Last compiled: ${new Date(doc.lastCompiled).toLocaleDateString()}` : 'Not compiled yet'}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {getCompilationStatusIcon()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Editor */}
        <Card className="card-hover lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  LaTeX Editor
                </CardTitle>
                <CardDescription>
                  {currentDocument?.title} - {getCompilationStatusText()}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleSave}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
                {currentDocument?.compilationStatus === 'success' && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => paperActions.downloadPDF(currentDocument.id)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Document Title */}
              <div>
                <label className="text-sm font-medium">Document Title</label>
                <input
                  type="text"
                  value={currentDocument?.title || ''}
                  onChange={(e) => setCurrentDocument(prev => prev ? { ...prev, title: e.target.value } : prev)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-800 dark:border-gray-600"
                />
              </div>

              {/* LaTeX Editor */}
              <div>
                <label className="text-sm font-medium">LaTeX Content</label>
                <textarea
                  value={currentDocument?.content || ''}
                  onChange={(e) => setCurrentDocument(prev => prev ? { ...prev, content: e.target.value } : prev)}
                  className="w-full mt-1 h-96 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-800 dark:border-gray-600 font-mono text-sm"
                  placeholder="Enter your LaTeX code here..."
                />
              </div>

              {/* Compilation Status */}
              {currentDocument?.compilationStatus === 'error' && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
                    <AlertCircle className="h-4 w-4" />
                    <span className="font-medium">Compilation Error</span>
                  </div>
                  <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                    {currentDocument.errorMessage}
                  </p>
                </div>
              )}

              {/* Quick Actions */}
              <div className="flex items-center gap-2 pt-4 border-t">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  {showPreview ? 'Hide' : 'Show'} Preview
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentDocument(prev => prev ? { ...prev, content: defaultLaTeXTemplate } : prev)}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset Template
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* PDF Preview */}
      {showPreview && currentDocument?.compilationStatus === 'success' && (
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              PDF Preview
            </CardTitle>
            <CardDescription>Generated PDF preview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800 min-h-96 flex items-center justify-center">
              <div className="text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">PDF preview would be displayed here</p>
                <p className="text-sm text-muted-foreground mt-2">
                  In a real implementation, this would show the compiled PDF
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* LaTeX Tips */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            LaTeX Tips
          </CardTitle>
          <CardDescription>Common LaTeX commands and best practices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-2">Document Structure</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• <code>{"\\section{Title}"}</code> - Create a section</li>
                <li>• <code>{"\\subsection{Title}"}</code> - Create a subsection</li>
                <li>• <code>{"\\begin{abstract}...\\end{abstract}"}</code> - Abstract</li>
                <li>• <code>{"\\maketitle"}</code> - Generate title page</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Math & Equations</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• <code>$...$</code> - Inline math</li>
                <li>• <code>$$...$$</code> - Display math</li>
                <li>• <code>{"\\begin{equation}...\\end{equation}"}</code> - Numbered equation</li>
                <li>• <code>{"\\cite{reference}"}</code> - Citation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 