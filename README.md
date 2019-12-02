# Who's That Pokemon? - A Data Visualization Final Project
#### Matthew Christensen and Jennifer Nelson
##### u0899251@utah.edu & u1060401@utah.edu


### Links:
Project website: [jenniNelson.github.io](jenniNelson.github.io)

Demo Video: https://youtu.be/RQA8C236T8w


### File Structure:
- index.html : Main webpage with links to everything
- WhosThatPokemon : Folder with everything
    - teambuilder.html : The base html all the javascript works from
    - pokestyle.css : CSS Styles
    - data
        - map_data : map backgrounds and hand-annotated map svg
        - pokemon_data : 
            - sprites : pokemon images
            - typelabels : labels for pokemon types (water, fire, bug, etc.)
            - main_collection.csv: the final csv with all data used
            - (Intermediate files used to create main_collection.csv)
    - js
        - tools
            - sorttable.js : No longer used. Was an external library for sorting a previous table implementation. (https://kryogenix.org/code/browser/sorttable/)
        - fancy_dex.js : Creates the table
        - maps.js : Creates the map view and location highlighting
        - matchups.js : Creates team builder / vs views, with cards and summaries
        - pokedex.js : Older version of pokemon table. Not used.
        - script.js : The primary script which gets data from a csv
            - Contains the "cardManager" object which coordinates interaction between different views
    - utils
        - Many python files used for data scraping, cleaning, and organization
        - tabulator-master : Library used for fancy table sorting/filtering. (http://tabulator.info)
    - Various PDFs required for submission
    - Trimmed_Demo.mov : A video demonstrating the use of this tool
    
    
### Non-Obvious Features

- In the Team Summary, mouseover the chart to see lines connecting the selected pokemon
- Search for a pokemon by name, in either a card or the table
- Filter the table by type, generation, legendary status, or evolution tree
- Below the map, hover over a Pokemon's sprite to highlight where that pokemon can be found in the map.
