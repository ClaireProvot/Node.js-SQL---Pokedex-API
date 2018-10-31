# Pokedex-API

This is a simple and basic CRUD application (Create, Read, Update, Delete) using Node.js, Express, Sequelize and MySQL as database.

## Table of Contents

1. [Requirement](#Requirement)
2. [Install](#Install)
3. [Endpoints](#Endpoints)
4. [Specification](#Specification)

## Requirement

Pokedex-API requires the following to run:

- Node.js 8.10+
- npm 5.6+ (normally comes with Node.js)
- mySQL 8.0+

## Install

Running on local machine
```
git clone https://github.com/ClaireProvot/Pokedex-API
cd Pokedex-API
npm install
npm start
```
## Configuration

Once the server is running and is connected to your database, the data of Pokedex-assignment file (JSON format) must be populated in the mySQL database. 

```
node database.js
```

Now your API is ready to be used !

## Endpoints

### Get a pokemon

Use the endpoint **/pokemon/:id** to return data about a specific pokemon by the `id`.

#### Example 
 *localhost:3000/pokemons/1*

```{
    "id": 1,
    "base": {
        "HP": 45,
        "Speed": 45,
        "Attack": 49,
        "Sp.Atk": 65,
        "Sp.Def": 65,
        "Defense": 49
    },
    "cname": "妙蛙种子",
    "ename": "Bulbasaur",
    "id_pokemon": 1,
    "jname": "フシギダネ",
    "createdAt": "2018-10-23T06:22:18.000Z",
    "updatedAt": "2018-10-23T08:36:05.000Z",
    "Types": [
        {
            "id": 4,
            "cname": "毒",
            "ename": "Poison",
            "jname": "どく",
            "createdAt": "2018-10-23T06:22:18.000Z",
            "updatedAt": "2018-10-23T06:22:18.000Z",
            "pokemons_types": {
                "createdAt": "2018-10-23T06:22:21.000Z",
                "updatedAt": "2018-10-23T06:22:21.000Z",
                "PokemonId": 1,
                "TypeId": 4
            }
        },
        {
            "id": 12,
            "cname": "草",
            "ename": "Grass",
            "jname": "くさ",
            "createdAt": "2018-10-23T06:22:18.000Z",
            "updatedAt": "2018-10-23T06:22:18.000Z",
            "pokemons_types": {
                "createdAt": "2018-10-23T06:22:21.000Z",
                "updatedAt": "2018-10-23T06:22:21.000Z",
                "PokemonId": 1,
                "TypeId": 12
            }
        }
    ]
}
```


### Get all pokemons

Use the endpoint **/pokemons** to return data about all pokemons. 
Or filter the results with query string : id, name, or one of the 2 types of the pokemon. 

#### Example 
 *localhost:3000/pokemons?id=2&name=Bulbasaur&type=Poison*

 If you want you can configure its offset ( not limit ).

- `offset` is where to start. The first item that you will get. Default 0
- `limit` is how many items you want to list. Default 50

### Update a pokemon

Use the endpoint **/pokemon/:id** to update the name of a specific pokemon.
Specify the new name in the body of request as `name`.

### Create a pokemon

Use the endpoint **/pokemon/:id** to create a new pokemon.
Specify the characteristics in the body of request as :

- `base` is points of attack, defense, HP, specific attack, specific defence and speed. 

#### Example 
```
"base": {
            "Attack": 49, 
            "Defense": 49, 
            "HP": 45, 
            "Sp.Atk": 65, 
            "Sp.Def": 65, 
            "Speed": 45
        }
```
- `cname` is the chinese name of the pokemon

#### Example 
```
"cname": "\u5999\u86d9\u79cd\u5b50"
```
- `ename` is the english name of the pokemon

#### Example 
```
"ename": "Bulbasaur"
```
- `id_pokemon` is the id of the pokemon

#### Example 
```
"id_pokemon": "001"
```
- `jname` is the japanese name of the pokemon

#### Example 
```
"jname": "\u30d5\u30b7\u30ae\u30c0\u30cd"
```
- `type1` is the first type of the pokemon

#### Example 
```
"type1": "Poison"
```
- `type2` is the second type of the pokemon (optionnal)

#### Example 
```
"jname": "Rock"
```
Warning : **All these are mandatory except type2.**

**The *id* in the endpoint must be the same as the *id_pokemon* in the body request.**

### Delete a pokemon

Use the endpoint **/pokemon/:id** to delete a specific pokemon by the `id`.

## Specification

Before using the API, verifying that dependancies is well install in the package.json:
- body-parser 1.18+
- express 4.16+
- mysql2 1.6+
- nodemon 1.18+
- sequelize 4.38+
