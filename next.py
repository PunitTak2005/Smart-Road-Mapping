import folium
import random
import time
import json

# Initialize the map with a starting location
initial_location = [40.730610, -73.935242]  # New York City
map_object = folium.Map(location=initial_location, zoom_start=14)

gnss_points = []

# Function to simulate real-time GNSS data
def get_gnss_data():
    lat_offset = random.uniform(-0.001, 0.001)
    lon_offset = random.uniform(-0.001, 0.001)
    return [initial_location[0] + lat_offset, initial_location[1] + lon_offset]

# Real-time road mapping function (save map at each step)
def real_time_road_mapping():
    for i in range(10):  # Simulate 10 data points
        new_location = get_gnss_data()
        folium.Marker(new_location).add_to(map_object)
        gnss_points.append(new_location)
        print(f"New GNSS point added: {new_location}")
        time.sleep(1)  # Simulate a delay between data points

# Run the road mapping function
real_time_road_mapping()

# Save GNSS points to a JSON file
with open("gnss_data.json", "w") as f:
    json.dump(gnss_points, f)

# Final map save
map_object.save("smart_road_mapping_final.html")
