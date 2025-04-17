# Daxa

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

🌟 FrontConstruction - Module Assurance & Pointage
Application Angular pour la gestion des assurances et des pointages (microservices backend Spring Boot).

🚀 Installation & Lancement
Cloner le dépôt :
git clone https://github.com/houssemmoumni/FrontConstruction.git
cd FrontConstruction

Basculer sur la branche souhaitée (si spécifique) :
git checkout Assurance-Pointage

Installer les dépendances :
npm install

Démarrer l'application (mode développement) :
ng serve
Accédez à http://localhost:4200.

✨ Fonctionnalités
Module Assurance
Espace Administrateur :

📝 Gestion des contrats/assurances (CRUD).

🔗 Affectation d’assurances à des contrats.

📧 Notifications par mail lors des mises à jour.

Espace Ouvrier :

🔧 Gestion des maintenances.

🏗️ Association de contrats/projets aux maintenances.

Module Pointage
Espace Administrateur :

📊 Visualisation des pointages par admin.

Espace Ouvrier :

➕ Ajout de maintenances.

📥 Génération de PDF pour les pointages.

📱 Notification WhatsApp après pointage.


📚 Documentation Technique
Services Angular :

AssuranceService : Appels API pour le module assurance.

PointageService : Gère les requêtes liées aux pointages.

Composants Clés :

assurance-list.component : Affiche la liste des assurances.

pointage-form.component : Formulaire d’ajout de pointage.

📜 Endpoints API les plus imporatantes Utilisés
Fonctionnalité	Méthode	Endpoint

✨ Lister assurances	GET	/api/assurance/assurances

✨ Ajouter un pointage	POST	/api/pointage/create-pointage

✨ Ajouter une maintenance	POST	/api/assurance/create-maintenance
