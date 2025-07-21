# Game Design Document

## Description
Overall game vision, mechanics, and core design decisions

## Content
---
# Game Design Document: **"Wacky Golf Mysteries"**

## 1. Game Vision

**Elevator Pitch:**  
"Wacky Golf Mysteries" is a vibrant, browser-based mini-golf game where players putt their way through zany, themed holes. After each hole, players must solve a randomized mystery, riddle, or crime using clues earned based on their golfing performance. The better their score relative to par, the more clues they receive, creating a unique blend of skillful play and deductive reasoning.

---

## 2. Core Gameplay Loop

1. **Enter a Course:**  
   Select from a themed course (e.g., Haunted Mansion, Space Station, Jungle Ruins).

2. **Play a Hole:**  
   Use intuitive drag-and-release (touch/mouse) controls to aim and putt through imaginative, obstacle-filled holes.

3. **Complete the Hole:**  
   Finish the hole. Your strokes are compared to par to determine the number of clues awarded for the upcoming mystery.

4. **Solve the Mystery:**  
   A randomized, procedurally-generated mystery (e.g., "Who stole the trophy?", "Which alien ate the cake?") is presented. Use earned clues to deduce the answer from a list of suspects/options.

5. **Receive Feedback:**  
   Solve correctly for bonus points! Progress to the next hole and repeat.

6. **Course Complete:**  
   After all holes, receive a score summary and unlockables based on performance.

---

## 3. Target Audience

- Ages 10+, casual gamers, puzzle fans, and families.
- Players seeking quick, engaging browser-based experiences.
- Fans of mini-golf, party games, and light mystery-solving.

---

## 4. Key Differentiators

- **Skill-based Clue System:**  
  Golf performance directly impacts mystery-solving resources, blending physical and mental gameplay.

- **Wacky Procedural Mysteries:**  
  Every hole features a new, randomized mystery with playful themes and suspects.

- **Instant, Responsive Play:**  
  Optimized for instant browser launch, touch/mouse controls, and seamless play across mobile and desktop devices.

---

## 5. Gameplay Systems

### 5.1. Golfing Mechanics

- **Input:**  
  Drag (touch/mouse) to aim and set power, release to putt.
- **Obstacles:**  
  Moving platforms, portals, ramps, themed hazards (e.g., haunted trees, zero-G zones).
- **Scoring:**  
  Standard mini-golf rules: strokes compared to par.
- **Replayability:**  
  Procedural hole layouts (optional for future expansion).

### 5.2. Mystery/Riddle Mechanics

- **Trigger:**  
  After each hole, launch a mystery interface.
- **Mystery Types:**  
  - "Whodunnit?" (pick the culprit)
  - Logic riddles ("Which door is safe?")
  - Item identification ("Which object is missing?")
- **Procedural Generation:**  
  Randomized suspects, clues, and outcomes, themed to the current course.

- **Clue Allocation:**  
  - 2+ under par: 3 clues
  - 1 under par: 2 clues
  - Par: 1 clue
  - Over par: 0 clues  
  (Clues are hints like alibis, physical evidence, or logical deductions.)

- **Solving:**  
  Multiple-choice selection with instant feedback.

### 5.3. Progression & Rewards

- **Scoring:**  
  Points for golf performance + mystery solving.
- **Unlocks:**  
  New courses, cosmetic ball skins, or "mystery journals."
- **Leaderboard:**  
  (Optional) Track high scores and fastest mystery solves.

---

## 6. User Interface & Experience

- **Main HUD:**  
  - Stroke counter, par, current hole, theme visuals.
  - "Mystery Meter" showing clue count after each hole.
- **Mystery Screen:**  
  - Suspect/item list, clues panel, answer submission.
- **Responsive Design:**  
  Layout adapts to mobile (vertical) and desktop (horizontal).
- **Accessibility:**  
  Clear visuals, readable fonts, and colorblind-friendly clues/suspects.

---

## 7. Technical Considerations

- **Browser Performance:**  
  - Lightweight 2D graphics, SVG/canvas-based animations.
  - Limit on active obstacles and effects per hole.
- **Procedural Systems:**  
  - Pre-defined "mystery templates" with random parameters.
- **Input:**  
  - Touch support for mobile; mouse drag for desktop.
- **Instant Load:**  
  - Minimal asset size, progress saved per session.
- **Offline/Resume Support:**  
  - Simple localStorage for progress tracking.

---

## 8. Example Flow

1. Player selects "Haunted Mansion" course.
2. Hole 1: Aim and shoot through spooky obstacles, finish 1 under par.
3. Get 2 clues for "Who scared the cat?" mystery:
    - Clue 1: "The chef was in the kitchen."
    - Clue 2: "The butler hates cats."
    - Choose "The butler" as the suspect.
4. Solve correctly, gain bonus points, proceed to next hole.

---

## 9. Success Metrics

- **Engagement:**  
  - Avg. session length
  - Holes/mysteries completed per session
- **Retention:**  
  - % of players returning within a week
- **Performance:**  
  - Consistent 60fps on most devices
- **Satisfaction:**  
  - Positive player feedback on fun, mystery variety, and controls

---

## 10. Next Steps / Implementation Notes

- Build prototype of golf + mystery loop.
- Develop procedural mystery generator (template system).
- Create 1 test course with 3 holes and 3 mystery templates.
- Playtest for balance of golf difficulty vs. clue allocation.

---

**Potential Conflicts/Consistency Notes:**  
_No characters, mechanics, or systems are currently defined in existing project documents. This document serves as a foundation for all game systems and is not in conflict with prior content._


---
*Generated on 7/21/2025*
