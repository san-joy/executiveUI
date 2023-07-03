# ExecutiveUI
A user-friendly interface for creating, updating, and viewing executives.
## Running UI
To run this app, you will need the following prerequisites:

1. Node.js: Angular requires Node.js to be installed on your system. You can download Node.js from the official website (https://nodejs.org) and follow the installation instructions for your operating system.

2. npm (Node Package Manager): npm is installed automatically with Node.js. It is used to install and manage dependencies in your Angular project.

3. Git: Git is a version control system used for managing code repositories. Install Git on your system by downloading it from the official website (https://git-scm.com) and following the installation instructions.

Once you have these prerequisites installed, you can run this Angular app from the GitHub repository by following these steps:

1. Clone the repository: Open a terminal or command prompt and navigate to the directory where you want to clone the repository. Run the following command to clone the repository to your local machine:
```
git clone https://github.com/san-joy/executiveUI.git
```
This command will create a local copy of the repository on your machine.

2. Navigate to the project directory: Change into the project directory by running the following command:
```
cd executiveUI
```
3. Install project dependencies: Use npm to install the project dependencies specified in the package.json file. Run the following command:
```
npm install
```
This will download and install all the required dependencies for the Angular app.

4. Run the Angular app: Once the dependencies are installed, you can start the development server and run the Angular app locally. Use the following command:
```
ng serve
```
5. Open a web browser and navigate to http://localhost:4200/. You should see the Angular app running.
By following these steps, you should be able to run the Angular app from the GitHub repository on your local machine.

## Running API
No changes have been made to the API layer. Please proceed with the regular process by restoring the SQL server database and running the ASP.NET Core API as usual.

# What has been implemented? 
Scope of the project: 
- **Angular components, with use of @input, @output & EventEmitter:** 
This implementation is demonstrated in the executive form component, where executive values are inputted from the view executive component. The emitted values are then outputted during form submission and changes are handled in the view executive component. 
- **Angular services:**
Two services have been created to handle executive data and executive group data requests. These services are then injected into different components wherever they are required.
- **RxJs Library Observables:**
I have utilized various RxJS operators such as `map`, `of`, `subscription`, etc. throughout the application.
- **Angular Material (or other library you are familiar with):**
I have used Angular Material within the project. You can find a list of the imported libraries in a separate Angular Material module file within project structure. 
- **SCSS variables:**
Angular Material has already handled most of the styling for components like mat card, mat table, etc. However, I have chosen SCSS for styling and made additional CSS changes. These changes can be found in the footer component, styles.scss, and other relevant files.

Bonus points if you also manage to use:
 
- **Angular Material Autocomplete for selects (such as Executive details group field):**
Although I was unable to implement it, I am aware that Angular Material provides an Autocomplete component that can be easily incorporated. You can find detailed guidance on implementing Angular Material Autocomplete at this link: https://material.angular.io/components/autocomplete/overview.
- **Angular Material Animations for loading data:**
I have successfully implemented Angular Material's progress-spinner, which is visible during the loading of executive data into the table.
- **Responsive Web Design (screen size responsive):**
Angular Material has effectively handled most of the functionalities, resulting in a responsive app. However, I am proficient in CSS media queries and can implement custom CSS based on different screen sizes if required. In the project, I have utilized flexbox CSS, and you can observe some of the implementations in the styles.scss file.

# Limitaton or future improvement
Due to time constraints,
- Client-side caching mechanisms utilizing RxJS subjects, behavioral subjects, and local storage were not implemented. This can be improved in the future to enhance performance and optimize data management.
- Currently, all executive data is loaded into the table, which may pose challenges with large datasets. To address this, pagination can be implemented, and improvements in the API layer can be made to support query strings for specifying the number of data to retrieve.
- The project lacks unit tests at the moment, which is not ideal for ensuring code reliability and maintainability. However, this can be improved in the future by implementing comprehensive unit tests to validate the functionality and identify any potential issues.






