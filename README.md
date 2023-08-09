# Chatbot

**1. Install Dependencies**

```bash
yarn install
```

**2. Provide Keys**

Find the .env file in the root of the repo. Keep the existing variables and add the following values

```bash
OPENAI_API_KEY=''
PINECONE_API_KEY=''
PINECONE_ENVIRONMENT=''

# Navigate to Indexes under your Project to retrieve the Index name
PINECONE_INDEX=''
```

## 3. Change Namespace**

Change the namespace in these files to the appropriate name.

In utils/server/context.ts

```bash
const context = await getContext(lastMessage.content, 'KPFellows4', 10000, 0.7, false) as ScoredVector[]
```
```bash
const context = await getContext(lastMessage.content, 'YOUR_NAMESPACE', 10000, 0.7, false) as ScoredVector[]
```

And in pages/api

```bash
const context = await getContext(lastUserMessage.content, 'KPFellows4', 10000, 0.7, false) as ScoredVector[];
```
```bash
const context = await getContext(lastUserMessage.content, 'YOUR_NAMESPACE', 10000, 0.7, false) as ScoredVector[];
```

**4. Run App**

```bash
yarn dev
```

**5. Use chatbot**

Begin chatting.
