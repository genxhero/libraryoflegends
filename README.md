#  Library of Legends

## What it Is
A web application for players of tabletop role playing games to store information about their characters.

## Technologies Used
This app uses GraphQL, React, and Express.

##Challenges

###Free Ability Boost for Human Characters
Problem: How to allow a player creating a human character to select two ability scores to receive an ancestry bonus.  Doing it for elves and dwarves was a simple matter of letting the user select one stat from a short list.  
Solution: Create a FIFO queue! When there are already two ability scores selected, the oldest ability score in queue is removed from the array, and the new one takes its place.
