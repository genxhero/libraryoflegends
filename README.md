#  Library of Legends

## What it Is
A web application for players of tabletop role playing games to store information about their characters.

## Technologies Used
This app uses GraphQL, React, and Express.  Images are stored on Amazon S3.

## Challenges


## TODOS

### Edit Character
Change age, bio, image, and name mostly.

### Level Up Character
* When first implemented will only be able to increase ability scores
* Later I would like to add an array of feats and class features based on class chosen
* Multi-Classing being a colossal pain, I have no intention of implementing it at this time.

### Support for Multiple Systems
* Create a new set of components for creating Pathfinder 1st edition possibly other systems
* Current components will be moved to a PathfinderSecond or PF2ED folder, new components will go in PF1ED
* Characters will have a new "system" column in the database, so that when levelling up the correct components are loaded.