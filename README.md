# 🏗️ CONSPRIT - Construction Management Platform

**CONSPRIT** is an advanced and modular construction management platform designed using a microservices architecture. It was developed as part of a final-year academic project at **ESPRIT School of Engineering** by the team **MEGAMINDS**, composed of seven developers.

## 👥 Developed by Team MEGAMINDS

> A team of 7 passionate developers from **ESPRIT School of Engineering**  
> Project developed as part of the **PIDEV** end-of-studies program.

---

## 🚀 Project Overview

**CONSPRIT** offers a complete digital solution to manage all aspects of a construction project:

- User, Task, and Project Management
- Resource Tracking
- Financial Planning
- Internal Communication
- Attendance and Time Tracking
- Market and Tendering Management
- Recruitment and Incident Workflow
- Insurance and Maintenance
- Negotiations and Contract Signing

Each domain is encapsulated in a dedicated **Spring Boot Microservice**, communicating via a **Spring Cloud Gateway** and discovered through **Eureka Discovery Server**. The frontend is built with **Angular 19**.

---

## 🛠️ Tech Stack

- **Backend**: Spring Boot (Microservices)
- **Frontend**: Angular 19
- **Service Discovery**: Spring Cloud Eureka
- **API Gateway**: Spring Cloud Gateway
- **Configuration Server**: Spring Cloud Config
- **Databases**: MYSQL
- **Authentication**: OAuth2 / Keycloak
- **DevOps**: Docker-ready architecture

---

## 🧠 Project Highlights

- Token-based interview scheduling with expiration
- AI-powered CV analysis and filtering
- QR Code generation and digital contract signing
- Incident tracking with technician assignment and resolution workflow
- Role-based access control and notification system
- AI-driven facial recognition for attendance tracking
- Intelligent resource allocation using project needs and worker availability
- Real-time messaging with bad-word detection
- 2D plan generation during negotiation phases

---

## 📦 Core Modules and Features

### ✅ User Management
- **Admin**: Create, modify, delete user accounts (Client, PM, Worker, etc.)
- **Auth**: Login via password or OAuth2/SSO using Keycloak
- **Admin**: Manage roles, permissions, reset passwords, activate/deactivate users
- **User**: Update profile, avatar generation
- **System**: Logs user activity

### 🧱 Project Management
- Admin can create/modify/delete projects
- Assign users to projects by role
- Multi-phase project structure (planning, design, execution)
- Store documents (plans, contracts, estimates)
- Dashboard tracking with statistics
- All roles can view project states (ongoing, completed, cancelled)

### 📋 Task Management
- Tasks creation/modification/deletion by Project Manager
- Assign tasks, define priorities and deadlines
- Manage statuses (To Do, In Progress, Completed)
- Gantt chart visualization
- Alerts for overdue tasks

### 🏗️ Resource Management
- Admin can manage materials and suppliers
- Stock level tracking with alerts
- Material order history and tracking
- Assign resources to tasks
- **AI**: Intelligent resource allocation

### 💰 Financial Management
- Budget definition per project
- Track expenses per task and resource
- Compare estimated vs actual costs
- Generate detailed financial reports
- Alerts on budget overruns

### 💬 Communication Management
- Internal messaging between users
- Task-specific discussion threads
- Notifications (deadlines, updates, approvals)
- Real-time WebSocket notifications
- Bad-word detection in messages

### 🕒 Attendance Management (Pointage)
- Workers clock in/out (manual, QR code, RFID)
- System records working hours, generates reports
- Admin validates entries, tracks absences
- Alerts for late arrivals or absences
- **AI**: Facial recognition-based clock-in

### 📑 Market Management
- Admin can publish calls for tenders with budgets
- Offer validation workflow
- PDF contract generation and digital signing
- Stripe / PayPal integration for payment
- Contract history view

### 🎓 Training & Blog Management
- Admin creates training sessions
- Workers register, system tracks attendance
- Certificate issuance
- Internal blog for guides and posts
- Search and notifications for new content

### 🧑‍💼 Recruitment Management
- Admin posts job offers
- Candidates submit resumes and cover letters
- Application dashboard (In Progress, Accepted, Rejected)
- Interview scheduling with token-based links
- Recruiter notes and evaluation
- **AI**: CV filtering and ranking
- Hired candidates are added to user system

### 🛡️ Insurance & Maintenance
- Insurance linked to completed projects
- Contract and policy management
- Alerts for insurance expirations
- Maintenance request handling by users
- Historical maintenance tracking

### 🤝 Negotiation Management
- Discussion threads per negotiation phase
- Validation-driven phase transitions
- Document sharing within threads
- AI-powered budget estimation
- 2D plan generation for proposals
## 📚 How to Run the Project

> Each microservice must be started individually after the Config Server and Discovery Server.  
> Use Angular CLI to run the frontend. Ensure MYSQL configurations are accessible.

```bash
# Start Config Server
cd config-server
./mvnw spring-boot:run

# Start Eureka Discovery Server
cd discovery-server
./mvnw spring-boot:run

# Start Gateway
cd gateway-service
./mvnw spring-boot:run

# Start each microservice (example)
cd user-service
./mvnw spring-boot:run

# Frontend (Angular 19)
cd frontend
npm install
ng serve
