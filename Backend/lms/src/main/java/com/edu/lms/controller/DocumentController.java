package com.edu.lms.controller;

import com.edu.lms.entity.Document;

import com.edu.lms.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/document")
@CrossOrigin(origins = "*")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    /* Create */
    @PostMapping("")
    public String createDocument(@RequestBody Document document){
        return documentService.addDocument(document);
    }

    /* Read */
    @GetMapping("")
    public ResponseEntity<List<Document>> viewDocuments(){
        List<Document> documents = documentService.getDocument();
        documentService.getDocument();
        return ResponseEntity.ok(documents);
    }

    @GetMapping("/{id}")
    public Document findDocumentById(@PathVariable Long id){
        return documentService.findDocumentById(id);
    }

    /* Delete */
    @DeleteMapping("/{id}")
    public String deleteDocument(@PathVariable Long id){
        return documentService.deleteDocument(id);
    }

    /* Update */
    @PutMapping("/{id}")
    public String updateDocument(@PathVariable Long id, @RequestBody Document document){
        return documentService.updateDocument(id,document);
    }


}
