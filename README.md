# Swift API

This is test application to test Koa and implement couple of APIs working with SqlLite and CSV.

## How to run

* `npm i` 
* `npm start`

## API Docs

App will run on http://127.0.0.1:8000 localhost port.

### get endpoint `/`

> Query params

**columns** - `string` - *optional*
*default - all*

- *all* will return all the columns of swift data
- specify specific one or more columns. Columns are `song, artist, writer, album, year, plays_june, plays_july, plays_august`

ex: `song,year` will return results with only *song* and *year* columns
ex: `all` will return results with all the columns

**limit** - `number` - *optional*
*default - no limit*

- If you specify limit, it will return results with mentioned limit
- If no offset provided, default offset would be **0**.

ex: `10` only 10 results in the response

**offset** - `number` - *optional*
*default - if limit available then 0 else not defined*

- Results offset.

ex: `1` and limit `10` results from 11 - 20.

**order** - `string` - *optional*
*default - no order of results*

- Multiple column ordering available

ex: `song` Result will be ordered by song ascending order
ex: `song DESC` Result will be ordered by song descending order
ex: `year DESC,plays_june` Results will be ordered by year descending order and plays_june ascending order.

- To get most played songs for month of June and July `plays_june|plays_july DESC`

**search** - `string` - *optional*
*default - no search of filtering in results*

- search is separated by `|`.
- use case `(column)|(condition)|(value)`
- For `year`, `plays_june`, `plays_july`, and `plays_august` these search conditions available. `equal`, `greater`, `less`, `greater_equal`, `less_equal`, `not_equal`, and `between`

ex: `year|equal|2019` this will return songs released in 2019

- For `song`, `artist`, `writer`, and `album` these conditions available. `like`, and `in`.

ex: `song|like|the` this will return all the song titles which include *the*

## Call API

Import *postman collection* from `./postman` directory and start the server to call the api

## Test

- `npm start` start the server and *stop* the server. It will create the database(db.js).

- `npm test` it will run unit tests with jest