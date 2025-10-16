package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "skill")
public class Skill {

    @Id
    @Column(name = "skill_id")
    private int id;

    @Column(name = "skill_name", nullable = false, length = 50)
    private String skillName;

    @Column(name = "skill_level", nullable = false, length = 50)
    private String level;

    @Column(name = "skill_experience", nullable = false)
    private int experience; // years of experience

    @Column(name = "skill_topics", nullable = true, length = 200)
    private String topics; // topics to learn more

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSkillName() {
        return skillName;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public int getExperience() {
        return experience;
    }

    public void setExperience(int experience) {
        this.experience = experience;
    }

    public String getTopics() {
        return topics;
    }

    public void setTopics(String topics) {
        this.topics = topics;
    }

    @Override
    public String toString() {
        return "Skill [id=" + id + ", skillName=" + skillName + ", level=" + level +
               ", experience=" + experience + ", topics=" + topics + "]";
    }
}
