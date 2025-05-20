using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;

[Route("api/chat")]
public class ChatController : Controller
{
    private string? _api_key = Environment.GetEnvironmentVariable("ApiKey");
    private string? _url = Environment.GetEnvironmentVariable("AiUrl");

    [HttpPost()]
    public async Task<IActionResult> SendMessage([FromBody] Message[] messages)
    {
        // Early return for when the api doesn't recieve array of Message 
        if (messages == null) return BadRequest("No messages");

        // the Ai http body format has a field for chat_history and the loop formats the recieved request into that format
        string chat_history = "";
        for (int i = 0; i < messages.Length - 1; i = i + 2)
        {
            string question = messages[i + 1].Content;
            string response = messages[i].Content;
            chat_history += $$"""
            {
                "inputs": {
                    "question": "{{question}}"
                },
                "outputs": {
                    "answer": "{{response}}"
                }
            }
            """;
            // Add a comma only if its not on the last message, trailing commas are not supported in json
            if (i != messages.Length - 2)
                chat_history += ",";
        }
        // This is the format that the ai expects
        string jsonData = $$"""
            {
            "chat_history": [
                {{chat_history}}
            ],
            "question": "{{messages.Last().Content}}"
            }
        """;
        HttpClient client = new HttpClient();
        // api key header
        client.DefaultRequestHeaders.Add("Authorization", _api_key);

        // send request
        HttpContent postContent = new StringContent(jsonData, Encoding.UTF8, "application/json");
        var result = await client.PostAsync(_url, postContent);

        if (result.StatusCode == System.Net.HttpStatusCode.OK)
        {
            return Ok(await result.Content.ReadAsStringAsync());
        }
        return BadRequest(result);
    }

    public class Message
    {
        public string Role { get; set; }
        public string Content { get; set; }
    }
}