# BGS Sensors Project

Welcome to the BGS Sensors Project! This project visualises observational data from various sensors on a dynamic graph displayed at the bottom of the screen. Each point on the graph corresponds to a data reading from a sensor and represents the total number of data points collected for that specific sensor.

For sensors that return a single value, additional details can be accessed by hovering over the respective points on the graph.

## Using the App

1. Click the first dropdown, **Features of Interest**, and select a feature.
2. A second dropdown, **Sensors**, will appear. If a **Sensor** has any **observational data**, you will see a large dropdown of sensor IDs. If there are no **Observations**, the dropdown won't show anything.
3. Select a sensor and you will see plotted points on the graph, along with values for the minimum, maximum, and mean results.

## Available Scripts

### `npm start`

This command runs the application in development mode. To view the application in your browser, navigate to [http://localhost:3000](http://localhost:3000).

The page will automatically reload if you modify any of the source files. Additionally, lint errors will appear in the console, helping you maintain clean code.

## Project Structure

The codebase is organised into three primary sections for ease of navigation and maintenance:

### Screens

Located under `src/screen/sensor-screen`, this directory includes:

- `sensor-screen.tsx`: This file contains all the UI elements necessary for displaying the sensor screen. It also shows the integration of various components detailed in the next section.
  
- `sensor-screen-model.tsx`: This file features a view model function that manages state settings and event handlers, essential for dynamic and interactive elements on the screen.

### Components

Located under `src/components`, this directory houses the three main reusable components utilised in building the screens. Each component is designed to accept props, enhancing readability and simplifying code management by abstracting common functionalities.

### Types

Located under `src/types`, this directory consolidates common data types used across the project. By abstracting these types into a single location, the codebase is kept DRY (Don't Repeat Yourself), simplifying maintenance and scalability.
