import React from 'react';
import '../styles/careers.css';

const Careers = () => {
  const careerPaths = [
        {
          title: "Technology",
          description: "The technology industry includes roles in software development, cybersecurity, data science, artificial intelligence, and IT management. Technology professionals design and build the tools and systems that power the modern world.",
          examples: [
            "Software Developer",
            "Data Scientist",
            "Cybersecurity Analyst",
            "Cloud Engineer",
            "AI Specialist",
          ],
          skills: "Coding, problem-solving, algorithms, data analysis, project management."
        },
        {
          title: "Healthcare",
          description: "Healthcare professionals work in hospitals, clinics, or research centers, providing care to patients or researching new treatments. This field includes both direct care roles as well as administrative, medical research, and public health roles.",
          examples: [
            "Doctor",
            "Nurse",
            "Medical Researcher",
            "Healthcare Administrator",
            "Pharmacist",
          ],
          skills: "Medical knowledge, patient care, research skills, communication."
        },
        {
          title: "Business and Finance",
          description: "Careers in business and finance encompass a wide range of roles that help companies operate efficiently and grow. These careers involve managing financial assets, providing consultancy, and analyzing market trends.",
          examples: [
            "Financial Analyst",
            "Business Consultant",
            "Accountant",
            "Marketing Manager",
            "Investment Banker",
          ],
          skills: "Analytical skills, financial analysis, communication, leadership."
        },
        {
          title: "Creative Arts",
          description: "Creative arts careers span various fields such as visual arts, writing, film, fashion, and design. These professionals express ideas and emotions through various mediums.",
          examples: [
            "Graphic Designer",
            "Photographer",
            "Artist",
            "Writer",
            "Fashion Designer",
          ],
          skills: "Creativity, design skills, communication, attention to detail."
        },
        {
          title: "Education",
          description: "Education careers involve teaching and mentoring students, designing educational programs, and shaping the future of learners. Teachers, counselors, and administrators play a vital role in every educational institution.",
          examples: [
            "Teacher",
            "School Counselor",
            "Education Administrator",
            "Special Education Teacher",
            "Curriculum Developer",
          ],
          skills: "Teaching, communication, leadership, patience, curriculum development."
        },
        {
          title: "Engineering",
          description: "Engineering involves designing and creating solutions to technical problems in a wide range of industries, including civil, mechanical, electrical, and chemical engineering.",
          examples: [
            "Civil Engineer",
            "Mechanical Engineer",
            "Electrical Engineer",
            "Chemical Engineer",
            "Robotics Engineer",
          ],
          skills: "Problem-solving, math, design, teamwork, technical knowledge."
        },
        {
          title: "Human Resources",
          description: "Human Resources professionals manage recruitment, employee relations, and organizational development. They work to build a positive company culture and ensure employees are satisfied and productive.",
          examples: [
            "HR Specialist",
            "Recruiter",
            "HR Manager",
            "Employee Relations Specialist",
            "Training & Development Manager",
          ],
          skills: "Communication, conflict resolution, organizational skills, empathy."
        },
        {
          title: "Sales and Marketing",
          description: "Sales and marketing professionals are responsible for driving a company’s products or services to potential customers. These roles often involve strategic planning, understanding customer needs, and promoting a brand.",
          examples: [
            "Sales Manager",
            "Marketing Strategist",
            "Brand Manager",
            "Digital Marketing Specialist",
            "Content Creator",
          ],
          skills: "Communication, creativity, data analysis, negotiation, customer engagement."
        },
        {
          title: "Law and Legal Services",
          description: "Legal professionals help maintain justice in society. They may represent clients, provide legal advice, or work on the legislative side.",
          examples: [
            "Lawyer",
            "Paralegal",
            "Legal Consultant",
            "Judge",
            "Legal Secretary",
            "Corporate Counsel",
          ],
          skills: "Analytical thinking, communication, negotiation, research, attention to detail."
        },
        {
          title: "Science and Research",
          description: "Science and research professionals work in various fields including biology, chemistry, physics, and environmental sciences. Their work often leads to advancements in technology, healthcare, and understanding of the world.",
          examples: [
            "Biologist",
            "Chemist",
            "Environmental Scientist",
            "Research Scientist",
            "Clinical Researcher",
            "Lab Technician",
          ],
          skills: "Analytical skills, problem-solving, research methodologies, attention to detail."
        },
        {
          title: "Hospitality and Tourism",
          description: "The hospitality and tourism industry includes roles that serve the needs of travelers and visitors, ranging from hotels to event planning.",
          examples: [
            "Hotel Manager",
            "Travel Agent",
            "Event Coordinator",
            "Tour Guide",
            "Restaurant Manager",
            "Resort Staff",
          ],
          skills: "Customer service, communication, organizational skills, problem-solving."
        },
        {
          title: "Construction and Architecture",
          description: "Careers in construction and architecture focus on designing, building, and maintaining structures and infrastructure. These professionals ensure that cities and towns are functional and safe.",
          examples: [
            "Architect",
            "Construction Manager",
            "Civil Engineer",
            "Urban Planner",
            "Quantity Surveyor",
            "Interior Designer",
          ],
          skills: "Design skills, project management, problem-solving, construction knowledge."
        },
        {
          title: "Media and Journalism",
          description: "Media and journalism professionals inform the public through written, visual, and audio content. They cover news, events, and entertainment across multiple platforms.",
          examples: [
            "Journalist",
            "News Anchor",
            "Editor",
            "Photographer",
            "Social Media Manager",
            "Video Producer",
          ],
          skills: "Writing, interviewing, research, multimedia production, public speaking."
        },
        {
          title: "Logistics and Supply Chain",
          description: "The logistics and supply chain industry focuses on managing the flow of goods and services. Professionals ensure products are sourced, manufactured, and delivered efficiently.",
          examples: [
            "Supply Chain Manager",
            "Logistics Coordinator",
            "Procurement Specialist",
            "Distribution Manager",
            "Warehouse Supervisor",
            "Transportation Planner",
          ],
          skills: "Organizational skills, problem-solving, communication, time management."
        },
        {
          title: "Retail and E-commerce",
          description: "Retail and e-commerce involve managing the buying and selling of goods, either through physical stores or online platforms. Careers in this field often involve customer interactions, product management, and sales strategies.",
          examples: [
            "Retail Manager",
            "E-commerce Specialist",
            "Visual Merchandiser",
            "Customer Service Representative",
            "Store Owner",
            "Supply Chain Analyst",
          ],
          skills: "Customer service, sales strategies, inventory management, digital marketing."
        },
        {
          title: "Social Services and Nonprofit",
          description: "Careers in social services and nonprofits focus on helping individuals, communities, and society as a whole. These professionals work in areas like counseling, mental health, and poverty alleviation.",
          examples: [
            "Social Worker",
            "Therapist",
            "Nonprofit Manager",
            "Public Health Specialist",
            "Community Organizer",
            "Fundraising Coordinator",
          ],
          skills: "Empathy, communication, problem-solving, organization, advocacy."
        },
        {
          title: "Transportation and Aviation",
          description: "Careers in transportation and aviation focus on getting people and goods to their destinations, whether it’s by air, land, or sea.",
          examples: [
            "Pilot",
            "Air Traffic Controller",
            "Aircraft Maintenance Technician",
            "Transportation Planner",
            "Truck Driver",
            "Logistics Coordinator",
          ],
          skills: "Technical skills, communication, problem-solving, time management, attention to detail."
        },
        {
          title: "Agriculture and Farming",
          description: "The agriculture and farming industry involves the cultivation of plants, livestock care, and the management of natural resources. Careers here are essential for food production and environmental sustainability.",
          examples: [
            "Farmer",
            "Agricultural Scientist",
            "Horticulturist",
            "Agricultural Engineer",
            "Soil Scientist",
            "Crop Advisor",
          ],
          skills: "Knowledge of biology and chemistry, problem-solving, environmental awareness, mechanical skills."
        },
        {
          title: "Energy and Environment",
          description: "Professionals in the energy and environment sectors work on sustainable energy solutions, environmental protection, and resource management.",
          examples: [
            "Renewable Energy Specialist",
            "Environmental Consultant",
            "Energy Auditor",
            "Climate Change Analyst",
            "Environmental Policy Advisor",
            "Sustainability Manager",
          ],
          skills: "Environmental knowledge, data analysis, project management, problem-solving."
        },
      ];

  return (
    <div className="careers-page">
      <header className="careers-header">
        <h1>Explore Various Career Paths</h1>
        <p>Discover a variety of careers across different industries and sectors. Whether you’re just starting your career or exploring new paths, there’s something for everyone.</p>
      </header>

      <section className="career-categories">
        {careerPaths.map((career, index) => (
          <div key={index} className="career-card">
            <h3>{career.title}</h3>
            <p><strong>Description:</strong> {career.description}</p>
            <p><strong>Examples of Careers:</strong></p>
            <ul>
              {career.examples.map((example, idx) => (
                <li key={idx}>{example}</li>
              ))}
            </ul>
            <p><strong>Key Skills:</strong> {career.skills}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Careers;
