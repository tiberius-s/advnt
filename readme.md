# Advent of Code 2022

Finding solutions to the 2022 Advent of code and playing around with Deno

## Usage

### Basic

The project is set up as a CLI and has a day command that takes a kebab-case
string to denote the date:

```sh
deno run --allow-read=. main.ts day one
```

### Compile to Executable

Compile the project with the permissions flags and run the CLI with an executable

```sh
deno compile --allow-read=. main.ts
# compilation output ensues
./advnt day one
```

Oh no, how do I get rid of this thing? Just...

```sh
rm advnt
```

### Install Globally

Alternatively, the program can be installed and run with the `advnt` name

First, we install the package globally and give it permission to read the hd
when installing

```sh
deno install --allow-read=. main.ts
# ... installation logs to stdout
advnt day one
```

Uninstalling is a breeze

```sh
deno uninstall advnt
```

### Run a Specific Solution

Lastly, you can use the `-p` or `--part` flag to run either part one or two of
the day's solution

```sh
advnt day one -p two
```

## TODOs

- Set up tests for each day. Day 1 has a very small, initial one,but the ideal is to have the test file set up with the example given and use the tests for a TDD approach to a solution.
- CLI currently takes a string for the day argument, but it can be enhanced to take in a number as well.
- This project probably needs import maps set up, but still learning the lay of the land
