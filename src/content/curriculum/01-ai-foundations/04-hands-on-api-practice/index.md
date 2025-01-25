---
title: "Hands-on API Practice"
description: "Get practical experience working with AI APIs"
order: 4
publishedAt: 2024-03-19
author:
  name: "JS Cebu Team"
  avatar: "/avatars/team.png"
image: "/course/ai-foundations.png"
topics: ["OpenAI API", "Error Handling", "Rate Limiting", "Best Practices"]
duration: "1 hour"
level: "beginner"
prerequisites: ["JavaScript for AI", "Practical Use Cases"]
parentModule: "AI Foundations"
---

# Hands-on API Practice

## Setting Up OpenAI API Access

Before we start, you'll need to:

1. Create an OpenAI account
2. Generate an API key
3. Set up environment variables
4. Install the OpenAI SDK

```javascript
// Initialize OpenAI client
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
```

## Basic API Interactions

Let's start with some basic API calls:

```javascript
// Simple completion request
async function getCompletion(prompt) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// Image generation
async function generateImage(prompt) {
  try {
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
    });

    return response.data[0].url;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
```

## Error Handling and Rate Limiting

Implement robust error handling and rate limiting:

```javascript
class RateLimiter {
  constructor(maxRequests, timeWindow) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow;
    this.requests = [];
  }

  async waitForCapacity() {
    const now = Date.now();
    this.requests = this.requests.filter(
      (time) => now - time < this.timeWindow
    );

    if (this.requests.length >= this.maxRequests) {
      const oldestRequest = this.requests[0];
      const waitTime = this.timeWindow - (now - oldestRequest);
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }

    this.requests.push(now);
  }
}

const rateLimiter = new RateLimiter(3, 1000); // 3 requests per second

async function makeAPIRequest(prompt) {
  try {
    await rateLimiter.waitForCapacity();
    return await getCompletion(prompt);
  } catch (error) {
    if (error.response?.status === 429) {
      console.log("Rate limit exceeded, retrying...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return makeAPIRequest(prompt);
    }
    throw error;
  }
}
```

## Streaming Responses

For longer responses, use streaming:

```javascript
async function streamCompletion(prompt, onChunk) {
  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      onChunk(content);
    }
  } catch (error) {
    console.error("Streaming error:", error);
    throw error;
  }
}

// Usage example
streamCompletion("Tell me a story", (chunk) => {
  process.stdout.write(chunk);
});
```

## Best Practices

1. **API Key Security**

   - Never expose API keys in client-side code
   - Use environment variables
   - Implement proper key rotation

2. **Error Recovery**

   - Implement exponential backoff
   - Handle rate limits gracefully
   - Log errors for debugging

3. **Performance Optimization**
   - Cache responses when appropriate
   - Use streaming for long responses
   - Implement request batching

## Practical Exercise

Create a simple chat application that:

1. Takes user input
2. Sends it to the OpenAI API
3. Streams the response back
4. Implements proper error handling
5. Uses rate limiting

This exercise will help you practice everything we've covered in this section.

## Additional Resources

- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
- [Rate Limiting Best Practices](https://platform.openai.com/docs/guides/rate-limits)
- [Error Handling Guide](https://platform.openai.com/docs/guides/error-codes)
