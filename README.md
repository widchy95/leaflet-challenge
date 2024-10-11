# leaflet-challenge
 
# Earthquake and Tectonic Plates Visualization

## Overview

This project aims to visualize seismic activity and tectonic plate boundaries using Leaflet, a popular JavaScript library for interactive maps. The map displays live earthquake data and tectonic plates, allowing users to explore the relationship between these two datasets.

## Project Structure

- `index.html`: The main HTML file that sets up the Leaflet map and includes external libraries and styles.
- `static/css/style.css`: Custom CSS for styling the map and legend.
- `static/js/logic.js`: JavaScript logic to fetch, process, and visualize earthquake and tectonic plate data.

## Project website view

- [Leaflet-Part-1](https://widchy95.github.io/leaflet-challenge/Leaflet-Part-1/)
- [Leaflet-Part-2](https://widchy95.github.io/leaflet-challenge/Leaflet-Part-2/)


## Work Process

1. **Setup Environment**:
   - Initialized a new project directory.
   - Created necessary folders for `css`, `js`, and other assets.

2. **Base Map Configuration**:
   - Integrated Leaflet and external libraries by including their CDN links in `index.html`.
   - Set up multiple base maps (Street, Satellite, Grayscale, and Outdoors) to provide users with different viewing options.

3. **Data Sources**:
   - Selected data sources for live earthquake data from the USGS and tectonic plates from [fraxen/tectonicplates](https://github.com/fraxen/tectonicplates).
   - Used D3.js to fetch and process GeoJSON data for earthquakes and tectonic plates.

4. **Marker and Color Configuration**:
   - Created custom marker styles based on earthquake magnitude and depth, using circles for visualization.
   - Implemented a color scale for the depth of earthquakes to enhance data interpretation.

5. **Layer Control Implementation**:
   - Organized earthquake and tectonic plates into separate layer groups for independent visibility control.
   - Added layer controls to the map to allow users to toggle between datasets easily.

6. **Legend Creation**:
   - Developed a dynamic legend to represent the depth color scale on the map for better user understanding.

7. **Testing and Deployment**:
   - Conducted thorough testing to ensure that the map displays correctly across different browsers.
   - Deployed the project to a web server for public access.

## Future Enhancements

- **User Interaction**: Implement user interactions, such as filtering earthquakes by magnitude or date range.
- **Additional Data Layers**: Explore the possibility of adding more data layers, such as population density or historical earthquake data.
- **Mobile Responsiveness**: Optimize the map for mobile devices for better accessibility.

## Technologies Used

- **HTML5**: For structuring the web page.
- **CSS3**: For styling the map and legend.
- **JavaScript**: For dynamic interactions and data fetching.
- **Leaflet**: For creating interactive maps.
- **D3.js**: For data manipulation and visualization.

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/widchy95/leaflet-challenge.git

## Prepared by 

**Widchy Joachim**
*Data Analyst*
