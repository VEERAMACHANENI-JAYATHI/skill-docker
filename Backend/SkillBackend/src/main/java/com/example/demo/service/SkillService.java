package com.example.demo.service;

import java.util.List;
import com.example.demo.entity.Skill;

public interface SkillService {
    
    Skill addSkill(Skill skill);

    List<Skill> getAllSkills();

    Skill getSkillById(int id);

    Skill updateSkill(Skill skill);

    void deleteSkillById(int id);
}
