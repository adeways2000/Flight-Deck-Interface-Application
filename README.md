# Flight Deck Interface Demo

### 
<img width="1365" height="629" alt="image" src="https://github.com/user-attachments/assets/4c19d9f6-daf5-41c5-8630-066005b9408e" />

<img width="1458" height="941" alt="ytrrnek" src="https://github.com/user-attachments/assets/5b441aac-5bb9-4079-b26f-8c35f9c27adc" />

## Project Overview

This project is an interactive demonstration of a modern flight deck interface, designed to showcase capabilities relevant to the Flight Deck. The application simulates key components of a commercial aircraft flight deck, including:

- Primary Flight Display (PFD)
- Navigation Display (ND)
- Engine Parameter Display
- System Status and Crew Alerting System

The interface features real-time data updates, responsive design, and adherence to aviation display principles and human factors considerations.

## Technical Architecture

### Technology Stack

- **Frontend Framework**: React with Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Icons**: Lucide React
- **State Management**: React useState and useEffect hooks

### Component Structure

```
src/
├── components/
│   ├── PrimaryFlightDisplay.jsx  # Artificial horizon, airspeed, altitude display
│   ├── NavigationDisplay.jsx     # Navigation map, waypoints, heading display
│   ├── EngineDisplay.jsx         # Engine parameters with visual indicators
│   └── SystemStatus.jsx          # Aircraft systems status and crew alerts
├── App.jsx                       # Main application component
└── main.jsx                      # Application entry point
```

### Data Flow

The application uses a centralized state in the App component that simulates flight data. This data is passed down to child components as props. A useEffect hook with setInterval creates real-time data updates by slightly modifying values at regular intervals to simulate an actual flight.

## Flight Deck Components

### Primary Flight Display (PFD)

The PFD provides essential flight information including:

- Artificial horizon with pitch and roll indicators
- Airspeed indicator
- Altitude indicator
- Heading display
- Vertical speed indicator

The artificial horizon dynamically responds to changes in pitch and roll values, providing a realistic representation of the aircraft's attitude.

### Navigation Display (ND)

The Navigation Display shows:

- Compass rose with current heading
- Flight path and waypoints
- Origin and destination airports
- Distance and ETA information
- Range and mode controls

The display uses SVG for rendering the compass and navigation elements, allowing for smooth animations and precise positioning.

### Engine Display

The Engine Display provides:

- N1 and N2 values for both engines
- Exhaust Gas Temperature (EGT)
- Fuel Flow rates
- Visual indicators with color-coding for normal, caution, and warning states
- Engine summary with total fuel flow and average parameters

### System Status

The System Status component includes:

- Status indicators for key aircraft systems (hydraulics, electrical, etc.)
- Crew Alerting System with color-coded messages
- Flight Mode Annunciator showing autopilot modes

## Human Factors Considerations

The interface incorporates several human factors principles:

1. **Color Coding**: Green for normal operations, yellow for caution, red for warnings
2. **Information Hierarchy**: Critical information is prominently displayed
3. **Consistency**: Similar information is presented in consistent formats across displays
4. **Readability**: High contrast text and appropriate font sizes
5. **Situational Awareness**: Key flight parameters are always visible

## Development Approach

The development process followed these steps:

1. Research of modern flight deck interfaces and design patterns
2. Creation of component structure and data flow design
3. Implementation of individual display components
4. Integration of real-time data simulation
5. Styling and visual refinement
6. Testing and validation

## Running the Application

To run the application locally:

```bash
# Navigate to the project directory
cd flight-deck-demo

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at http://localhost:5173/

## Future Enhancements

Potential enhancements for this demonstration could include:

1. Adding more interactive controls for pilots
2. Implementing failure scenarios and warning systems
3. Creating a more sophisticated flight model
4. Adding weather radar simulation
5. Implementing touch screen capabilities for Electronic Flight Bag integration

## Conclusion

This demonstration showcases the ability to design and implement complex, safety-critical interfaces with attention to human factors principles and aviation standards. The modular architecture allows for easy extension and maintenance, which is essential for long-lifecycle aviation systems.

