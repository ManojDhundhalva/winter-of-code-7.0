const executeCode = async (req, res) => {
  try {
    // Destructure and validate request body

    const sourceData = req.body;

    if(!sourceData?.language || !sourceData?.version){
      return res.status(400).json({ error: "Fileds are required!" });
    }

    const {
      language = "javascript",
      version = "18.15.0",
      sourceCode = "",
      codeInput = ""
    } = sourceData;

    if (!sourceCode.trim()) {
      return res.status(400).json({ error: "Source code cannot be empty." });
    }

    // Prepare the data payload
    const data = {
      language,
      version,
      files: [
        {
          content: sourceCode,
        },
      ],
      stdin: codeInput,
    };

    // Make the API call
    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // Check if the external API response is successful
    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        error: "Failed to execute code.",
        details: errorText,
      });
    }

    // Parse and return the response
    const results = await response.json();
    if (results && results.run) {
      return res.status(200).json(results.run);
    } else {
      return res.status(500).json({ error: "Unexpected API response format." });
    }

  } catch (error) {
    // Log the error for debugging and return a generic error response
    console.error("Error executing code:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      details: error.message || "An unexpected error occurred.",
    });
  }
};

module.exports = {
  executeCode,
};

// successully executed
// {
//   "language": "javascript",
//   "version": "18.15.0",
//   "sourceCode": "console.log(\"hello\")",
//   "codeInput": ""
// }

// {
//   "stdout": "hello\n",
//   "stderr": "",
//   "code": 0,
//   "signal": null,
//   "output": "hello\n"
// }

// failed for syntex error
// {
//   "language": "javascript",
//   "version": "18.15.0",
//   "sourceCode": "console.log(\"hello\")a",
//   "codeInput": ""
// }

// {
//   "stdout": "",
//   "stderr": "/piston/jobs/efd77625-37a0-4c5f-ba0c-149158a6f273/file0.code:1\nconsole.log(\"hello\")a\n                    ^\n\nSyntaxError: Unexpected identifier\n    at internalCompileFunction (node:internal/vm:73:18)\n    at wrapSafe (node:internal/modules/cjs/loader:1176:20)\n    at Module._compile (node:internal/modules/cjs/loader:1218:27)\n    at Module._extensions..js (node:internal/modules/cjs/loader:1308:10)\n    at Module.load (node:internal/modules/cjs/loader:1117:32)\n    at Module._load (node:internal/modules/cjs/loader:958:12)\n    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)\n    at node:internal/main/run_main_module:23:47\n\nNode.js v18.15.0\n",
//   "code": 1,
//   "signal": null,
//   "output": "/piston/jobs/efd77625-37a0-4c5f-ba0c-149158a6f273/file0.code:1\nconsole.log(\"hello\")a\n                    ^\n\nSyntaxError: Unexpected identifier\n    at internalCompileFunction (node:internal/vm:73:18)\n    at wrapSafe (node:internal/modules/cjs/loader:1176:20)\n    at Module._compile (node:internal/modules/cjs/loader:1218:27)\n    at Module._extensions..js (node:internal/modules/cjs/loader:1308:10)\n    at Module.load (node:internal/modules/cjs/loader:1117:32)\n    at Module._load (node:internal/modules/cjs/loader:958:12)\n    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)\n    at node:internal/main/run_main_module:23:47\n\nNode.js v18.15.0\n"
// }