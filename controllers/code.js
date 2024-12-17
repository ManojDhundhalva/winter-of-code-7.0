const executeCode = async (req, res) => {
  try {
    // Destructure and validate request body

    const sourceData = req.body;

    if(!sourceData?.language || !sourceData?.version || !sourceData?.sourceCode || !sourceData?.codeInput){
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
