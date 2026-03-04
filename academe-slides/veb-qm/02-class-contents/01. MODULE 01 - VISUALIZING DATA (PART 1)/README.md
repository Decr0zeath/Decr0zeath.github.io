# MODULE 01 — DATA VISUALIZATION (PART 1)

## Overview

This is **not** a single module.  
It should be distributed across approximately **2-3 sessions**.

Review this document fully before teaching to understand the pacing and intent.

Powerpoint presentation is located in the `resources/Module 01.pptx`

---

## Purpose of the Module

Before students can meaningfully approach Data Analysis in Python, they must first develop:

- A basic understanding of structured data  
- Foundational data visualization skills  

For this reason, Module 01 focuses on data visualization using Microsoft Excel.

This module establishes the foundation for later technical work. It should not be rushed.

---

## Teaching Approach

The conceptual portion of the lesson is straightforward. The challenge will be the Excel implementation.

Although this is Module 01, the material must be **granulated**. Expect this to span multiple meetings. Pace according to student comprehension, particularly during the Excel components.

Move at a speed that allows the majority of the class to follow.

---

# Part I — Understanding the Dataset Format

## Step 1 — Downloading the Datasets

Have students download all four (4) datasets.  You can find these files in the `resources/send-to-students/` folder 

Before opening any file, ask them to examine the file extension and identify what they notice. The objective is for them to observe that the files are: `.csv` and not `.xlsx`

---

## Step 2 — Why `.csv`?

Explain why datasets are commonly distributed as `.csv` rather than `.xlsx`

Key points:

- A `.csv` file is plain text.
- There are no embedded objects, formatting, or advanced features.
- Data is structured using a comma delimiter.
- Any software can read and parse it as text.
- In professional contexts, `.csv` is typically preferred for dataset exchange.

Students should understand that `.csv` prioritizes portability and interoperability.

---

# Part II — Seatwork 01 (Up to Module 02)

From this stage onward, students will follow along in Excel. This serves as **Seatwork 01**, continuing until Module 02.

Regularly remind students to save their work.

---

# Part III — Importing Data into Excel

There are two acceptable methods.

## Method A — Manual Import

Students may:

- Copy and paste the data, or  
- Open the `.csv` file and transfer the contents into a target `.xlsx` file  

Important:

- The data will not automatically be formatted as an Excel Table.
- Teach them to convert the range into a Table using: `Ctrl + T`

Also clarify:

- The Excel file is now independent of the original `.csv`.
- Changes made to the original file will not reflect in the Excel workbook.

---

## Method B — Data → Import Text/CSV

Guide students through:

Data → Import Text/CSV

Potential issue:

- Older versions of Excel may only provide “Import Text.”
- If unavailable, revert to Method A.

Advantage:

- The dataset remains connected to the original file through Power Queries & Connections.
- Students can refresh the dataset if the source file changes.

This reflects a more professional workflow.

---

# Part IV — Frequency Tables and Pivot Tables

Introduce the concept of a Frequency Table.

Before constructing it directly, have students create a Pivot Table:

Insert → Pivot Table

Explain that a Pivot Table:

- References the original dataset
- Does not modify or reorganize the source table
- Summarizes data dynamically

Ensure conceptual clarity before moving forward.

---

# Part V — Pivot Charts

After students understand Pivot Tables, introduce Pivot Charts.

Create visualizations based on the dataset:

- Bar graphs  
- Pie charts  

Guide the process carefully while still allowing students to explore.  
At minimum, demonstrate how to design the graphs you created.

In the resources folder for this module, you will find the exact output that should be shown in class. Use that as the visual reference.

Teach them how to properly format and refine their charts so they do not look flat. The goal is not decoration, but clarity and presentability.

In the end, the objective is to produce a strong and clear **visualization of data**.

---

# Conclusion

Have students save their work. Once completed, proceed to Module 02.

---

## Final Notes for Instructors

- Do not compress this into a single session.
- Granulate the Excel component.
- Adjust pacing based on comprehension.
- Emphasize saving work consistently.
- Prioritize understanding over speed.

This foundation directly affects how effectively students will later understand data analysis in Python.