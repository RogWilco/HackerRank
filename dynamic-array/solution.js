'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'dynamicArray' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. 2D_INTEGER_ARRAY queries
 */

function dynamicArray(n, queries) {
    // Write your code here
    const seqList = []
    let lastAnswer = 0
    const result = []

    // for(let i = 0; i < n; i++) {
    //     seqList.push([])
    // }

    for(let i = 0; i < queries.length; i++) {
        let q = queries[i][0]
        let x = queries[i][1]
        let y = queries[i][2]

        console.log(`${q} ${x} ${y}`)

        let index = ((x ^ lastAnswer) % n)

        if (seqList[index] === undefined) {
            seqList[index] = []
        }

        switch(q) {
            case 1:
                console.log(`seqList[${index}].push(${y})`)
                seqList[index].push(y)
                break

            case 2:
                console.log(`lastAnswer = seqList[${index}][${y % seqList[index].length}]`)
                lastAnswer = seqList[index][y % seqList[index].length]
                result.push(lastAnswer)
                break
        }
    }

    console.log(result)

    return result
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const q = parseInt(firstMultipleInput[1], 10);

    let queries = Array(q);

    for (let i = 0; i < q; i++) {
        queries[i] = readLine().replace(/\s+$/g, '').split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    const result = dynamicArray(n, queries);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
