package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Skill;
import com.example.demo.service.SkillService;

@RestController
@RequestMapping("/skillapi")
@CrossOrigin(origins = "*")
public class SkillController {

    @Autowired
    private SkillService skillService;

    // Home message
    @GetMapping("/")
    public String home() {
        return "Skill Management API is running";
    }

    // Create Skill
    @PostMapping("/add")
    public ResponseEntity<Skill> addSkill(@RequestBody Skill skill) {
        Skill savedSkill = skillService.addSkill(skill);
        return new ResponseEntity<>(savedSkill, HttpStatus.CREATED);
    }

    // Get All Skills
    @GetMapping("/all")
    public ResponseEntity<List<Skill>> getAllSkills() {
        List<Skill> skills = skillService.getAllSkills();
        return new ResponseEntity<>(skills, HttpStatus.OK);
    }

    // Get Skill by ID
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getSkillById(@PathVariable int id) {
        Skill skill = skillService.getSkillById(id);
        if (skill != null) {
            return new ResponseEntity<>(skill, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Skill with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    // Update Skill
    @PutMapping("/update")
    public ResponseEntity<?> updateSkill(@RequestBody Skill skill) {
        Skill existing = skillService.getSkillById(skill.getId());
        if (existing != null) {
            Skill updatedSkill = skillService.updateSkill(skill);
            return new ResponseEntity<>(updatedSkill, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot update. Skill with ID " + skill.getId() + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    // Delete Skill
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteSkill(@PathVariable int id) {
        Skill existing = skillService.getSkillById(id);
        if (existing != null) {
            skillService.deleteSkillById(id);
            return new ResponseEntity<>("Skill with ID " + id + " deleted successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot delete. Skill with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }
}
