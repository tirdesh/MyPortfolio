# 🔒 Security Guide for AI Terminal

## Current Setup (Frontend with API Key)

⚠️ **Important**: Your API key is currently exposed in the frontend code.

### What's Exposed
- Your Groq API key is visible in browser DevTools
- Anyone can extract it from the JavaScript bundle
- Client-side rate limiting can be bypassed

### Current Protections
✅ Input length validation (max 500 chars)
✅ Client-side rate limiting (1 request/second)
✅ Request timeout (10 seconds)
✅ Graceful error handling (no key leakage)
✅ Falls back to smart responses if API fails

## 🚨 For Production Deployment

### Option 1: Backend Proxy (RECOMMENDED)
Move API calls to your backend to keep keys secure:

```typescript
// Backend (e.g., Express.js, Next.js API route)
app.post('/api/chat', async (req, res) => {
  const response = await fetch('https://api.groq.com/...', {
    headers: { 'Authorization': `Bearer ${process.env.GROQ_API_KEY}` }
  });
  // Return response
});
```

**Benefits:**
- ✅ API key stays on server
- ✅ Proper rate limiting
- ✅ Request logging
- ✅ Cost control
- ✅ Better security

### Option 2: Use Environment Variables (Current)
For small personal projects, frontend API key is acceptable IF:
- ✅ You're using free tier with rate limits
- ✅ It's a personal portfolio
- ✅ You monitor usage regularly
- ✅ You rotate keys periodically

### Option 3: Restrict API Key Permissions
In Groq console:
1. Create API keys with limited scope
2. Set IP whitelist
3. Set spending limits
4. Monitor usage dashboard

## 📊 Monitoring

Check your API usage:
- **Groq Console**: https://console.groq.com/usage
- Set up usage alerts
- Review request logs

## 🔄 Key Rotation

Best practices:
1. Rotate API keys every 3-6 months
2. Revoke old keys after rotation
3. Don't commit `.env` files to git
4. Use different keys for dev/production

## 🛡️ Additional Security Measures

### Rate Limiting
Current: 1 request/second (client-side)
Recommended: Backend rate limiting per IP/user

### Input Validation
✅ Max message length: 500 characters
✅ Sanitize user input
✅ Block malicious patterns

### Error Handling
✅ Never expose API keys in errors
✅ Generic error messages to users
✅ Log errors server-side only

### Cost Control
- Set spending limits in Groq console
- Monitor usage daily
- Set up budget alerts

## 📝 Checklist Before Production

- [ ] Move API calls to backend
- [ ] Remove API key from frontend code
- [ ] Set up proper rate limiting
- [ ] Enable API key restrictions in Groq console
- [ ] Set spending limits
- [ ] Set up usage monitoring
- [ ] Document security measures
- [ ] Test error handling
- [ ] Review and rotate keys regularly

## 🔗 Useful Links

- [Groq Console](https://console.groq.com/)
- [Groq Documentation](https://console.groq.com/docs)
- [API Key Best Practices](https://cheatsheetseries.owasp.org/cheatsheets/API_Security_Cheat_Sheet.html)

## 💡 Questions?

For this portfolio project:
- Frontend API key is **acceptable** for personal use
- Add backend proxy for **production** or **public-facing** sites
- Monitor usage regularly
- Set spending limits
