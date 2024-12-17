# Code Runner API

This project utilizes the [PISTON API](https://piston.readthedocs.io/en/latest/api-v2/) to run code in multiple programming languages. It supports languages like Python, JavaScript, C++, Java, and more.

### Features
- Real-time code execution
- Supports multiple languages

### Credits

This project uses the [PISTON API](https://piston.readthedocs.io/en/latest/api-v2/) for executing code in multiple programming languages.

---

## POST `/code/execute-code`


### Description

This endpoint provides the ability to execute source code in a specified programming language and version. It accepts source code, optional input, and returns the results of the execution, including standard output, errors, and exit code.

### Request Body

The request body must be a JSON object containing the following fields:

- **`language`** (string): The programming language to execute (e.g., `javascript`, `python`).
- **`version`** (string): The version of the specified programming language (e.g., `18.15.0`).
- **`sourceCode`** (string): The source code to be executed.
- **`codeInput`** (string, optional): Input to be passed to the program during execution.

### Example Request

#### Successful Request

```json
{
  "language": "javascript",
  "version": "18.15.0",
  "sourceCode": "console.log(\"hello\")",
  "codeInput": ""
}
```

#### Failed Request (Syntax Error)

```json
{
  "language": "javascript",
  "version": "18.15.0",
  "sourceCode": "console.log(\"hello\")a",
  "codeInput": ""
}
```

### Response

#### Successful Execution

```json
{
  "stdout": "hello\n",
  "stderr": "",
  "code": 0,
  "signal": null,
  "output": "hello\n"
}
```

#### Failed Execution (Syntax Error)

```json
{
  "stdout": "",
  "stderr": "/piston/jobs/efd77625-37a0-4c5f-ba0c-149158a6f273/file0.code:1\nconsole.log(\"hello\")a\n                    ^\n\nSyntaxError: Unexpected identifier\n    at internalCompileFunction (node:internal/vm:73:18)\n    at wrapSafe (node:internal/modules/cjs/loader:1176:20)\n    at Module._compile (node:internal/modules/cjs/loader:1218:27)\n    at Module._extensions..js (node:internal/modules/cjs/loader:1308:10)\n    at Module.load (node:internal/modules/cjs/loader:1117:32)\n    at Module._load (node:internal/modules/cjs/loader:958:12)\n    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)\n    at node:internal/main/run_main_module:23:47\n\nNode.js v18.15.0\n",
  "code": 1,
  "signal": null,
  "output": "/piston/jobs/efd77625-37a0-4c5f-ba0c-149158a6f273/file0.code:1\nconsole.log(\"hello\")a\n                    ^\n\nSyntaxError: Unexpected identifier\n    at internalCompileFunction (node:internal/vm:73:18)\n    at wrapSafe (node:internal/modules/cjs/loader:1176:20)\n    at Module._compile (node:internal/modules/cjs/loader:1218:27)\n    at Module._extensions..js (node:internal/modules/cjs/loader:1308:10)\n    at Module.load (node:internal/modules/cjs/loader:1117:32)\n    at Module._load (node:internal/modules/cjs/loader:958:12)\n    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)\n    at node:internal/main/run_main_module:23:47\n\nNode.js v18.15.0\n"
}
```


Here is the error formatted correctly for better readability:

```
/piston/jobs/efd77625-37a0-4c5f-ba0c-149158a6f273/file0.code:1
console.log("hello")a
                    ^

SyntaxError: Unexpected identifier
    at internalCompileFunction (node:internal/vm:73:18)
    at wrapSafe (node:internal/modules/cjs/loader:1176:20)
    at Module._compile (node:internal/modules/cjs/loader:1218:27)
    at Module._extensions..js (node:internal/modules/cjs/loader:1308:10)
    at Module.load (node:internal/modules/cjs/loader:1117:32)
    at Module._load (node:internal/modules/cjs/loader:958:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:23:47

Node.js v18.15.0
```

The error indicates that there's an unexpected identifier (`a`) at the end of the `console.log("hello")` statement in the file. You likely need to remove the extra `a` after `"hello"` to resolve the issue. The corrected code should look like this:

```javascript
console.log("hello");
```

### Response Fields

- **`stdout`** (string): Standard output of the program.
- **`stderr`** (string): Standard error output of the program.
- **`code`** (integer): Exit code of the program. A code of `0` indicates successful execution.
- **`signal`** (string|null): Signal that caused the program to terminate, if any.
- **`output`** (string): Combined output from `stdout` and `stderr`.


### Language available

more info on 🔗 [PISTON API](https://piston.readthedocs.io/en/latest/api-v2/)


```javascript
export const LANGUAGE_DATA = [
    {
        language: 'c',
        version: '10.2.0',
        codeSnippet: `#include <stdio.h>\n\nint main() {\n\tprintf("Welcome to CHAP The code editor!");\n\treturn 0;\n}\n`,
        info: 'C does not have built-in Tree Set or Tree Map data structures, but you can use structures to build it.',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg',
    },
    {
        language: 'cpp',
        version: '10.2.0',
        codeSnippet: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n\tcout << "Welcome to CHAP The code editor!" << endl;\n\treturn 0;\n}\n`,
        info: 'C++ does not have built-in Tree Set or Tree Map data structures, but you can use `std::set` and `std::map` from the Standard Template Library (STL).',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',
    },
    {
        language: 'java',
        version: '15.0.2',
        codeSnippet: `import java.util.*;\nimport java.io.*;\n\npublic class Welcome {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Welcome to CHAP The code editor!");\n\t}\n}\n`,
        info: 'Java provides built-in Tree Set and Tree Map data structures in the `java.util` package, which are part of the Java Collections Framework.',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
    },
    {
        language: 'javascript',
        version: '18.15.0',
        codeSnippet: `function welcome() {\n\tconsole.log("Welcome to CHAP The code editor!");\n}\n\nwelcome();\n`,
        info: 'JavaScript does not have built-in Queue and Priority Queue data structures so you may use datastructures-js/queue and datastructures-js/priority-queue instead.',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    },
    {
        language: 'typescript',
        version: '5.0.3',
        codeSnippet: `type Params = {\n\tmessage: string;\n}\n\nfunction welcome(data: Params) {\n\tconsole.log(data.message);\n}\n\nwelcome({ message: "Welcome to CHAP The code editor!" });\n`,
        info: 'TypeScript does not have built-in Queue and Priority Queue data structures so you may use datastructures-js/queue and datastructures-js/priority-queue instead.',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
    },
    {
        language: 'python',
        version: '3.10.0',
        codeSnippet: `def welcome():\n\tprint("Welcome to CHAP The code editor!")\n\nwelcome()\n`,
        info: 'Python does not have built-in Tree Set or Tree Map data structures, so you may use `sortedcontainers` for sorted data structures.',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    },
    {
        language: 'go',
        version: '1.16.2',
        codeSnippet: `package main\nimport "fmt"\n\nfunc welcome() {\n\tfmt.Println("Welcome to CHAP The code editor!")\n}\n\nfunc main() {\n\twelcome()\n}\n`,
        info: 'Go (1.16.2)',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg',
    },
    {
        language: 'csharp',
        version: '6.12.0',
        codeSnippet: `using System;\nusing System.Collections.Generic;\n\nnamespace CodeEditor\n{\n\tclass Welcome {\n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Welcome to CHAP The code editor!");\n\t\t}\n\t}\n}\n`,
        info: 'C# provides `SortedSet<T>` and `SortedDictionary<TKey, TValue>` in the `System.Collections.Generic` namespace for sorted data structures.',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg',
    },
    {
        language: 'kotlin',
        version: '1.8.20',
        codeSnippet: `import java.util.*;\n\nfun welcome() {\n\tprintln("Welcome to CHAP The code editor!")\n}\n\nfun main() {\n\twelcome()\n}\n`,
        info: 'Kotlin (1.8.20)',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg',
    },
    {
        language: 'perl',
        version: '5.36.0',
        codeSnippet: `use List::Util qw(shuffle);\n\nsub welcome {\n\tprint "Welcome to CHAP The code editor!\\n";\n}\n\nwelcome();\n`,
        info: 'Perl (5.36.0)',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/perl/perl-original.svg',
    },
    {
        language: 'php',
        version: '8.2.3',
        codeSnippet: `<?php\n\necho "Welcome to CHAP The code editor!";\n`,
        info: 'PHP (8.2.3)',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg',
    },
    {
        language: 'ruby',
        version: '3.0.1',
        codeSnippet: `def welcome\n\tputs "Welcome to CHAP The code editor!"\nend\n\nwelcome()\n`,
        info: 'Ruby (3.0.1)',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ruby/ruby-original.svg',
    },
    {
        language: 'rust',
        version: '1.68.2',
        codeSnippet: `fn welcome() {\n\tprintln!("Welcome to CHAP The code editor!");\n}\n\nfn main() {\n\twelcome();\n}\n`,
        info: 'Rust (1.68.2)',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg',
    },
    {
        language: 'swift',
        version: '5.3.3',
        codeSnippet: `import Foundation\n\nfunc welcome() {\n\tprint("Welcome to CHAP The code editor!")\n}\n\nwelcome()\n`,
        info: 'Swift (5.3.3)',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg',
    },
    {
        language: 'bash',
        version: '5.2.0',
        codeSnippet: `#!/bin/bash\n\necho "Welcome to CHAP The code editor!"\n`,
        info: 'Bash (5.2.0)',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg',
    },
];
```

### Notes

- Ensure the `sourceCode` field contains valid code for the specified `language`.
- Syntax or runtime errors in the code will be returned in the `stderr` field.
- Exit codes other than `0` indicate errors in execution.

