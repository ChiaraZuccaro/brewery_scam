#BreweryScam

Node v.22
Angular v.19

# 🛠️ Proxy API - Response Codes

This section documents the custom error codes returned by the proxy api.php.

## 🔢 **Response Codes**
| Code  | Message                   | Description |
|-------|----------------------------|-------------|
| **100** | `Action not valid` | The requested action is not valid. Make sure you're using a supported action. |
| **105** | `Query params wrong` | The query parameters are incorrect. Check the syntax. |
| **200** | `Success` | Everything went good ✔ |

## 📌 **Example JSON Response**
When the proxy detects an error, it returns a formatted response like this:

```json
{
  "error": true,
  "code": 100,
  "response": {
    "message": "Action not valid"
  }
}