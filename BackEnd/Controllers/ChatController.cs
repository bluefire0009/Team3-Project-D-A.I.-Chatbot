using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;

[Route("api/chat")]
public class ChatController : Controller
{
    private string _api_key = "key here";
    private string _url = "url here";
    private string _systemPrompt = """prompt here""";

    [HttpPost()]
    public async Task<IActionResult> SendMessage([FromBody] Message[] messages) {
        string Msgs = $@"{{
    ""role"": ""system"",
    ""content"": ""{_systemPrompt}""
}},"+"\n";
        for (int i = 0; i < messages.Length; i++)
        {
            Msgs += $@"{{
    ""role"": ""{messages[i].Role}"",
    ""content"": ""{messages[i].Content}""
}}";
            if (i != messages.Length - 1) {
                Msgs += ",\n";
            }
        }
        string jsonData = $@"{{
    ""messages"" : [
        {Msgs}
    ],
    ""temperature"": 0.7,
    ""top_p"": 0.95,
    ""max_tokens"": 800,
    ""frequency_penalty"": 0,
    ""presence_penalty"": 0
}}";
    // return Ok(jsonData);
        HttpClient client = new HttpClient();
        // api key header
        client.DefaultRequestHeaders.Add("api-key", _api_key);

        // send request
        HttpContent postContent = new StringContent(jsonData, Encoding.UTF8, "application/json");
        var result = await client.PostAsync(_url, postContent);

        if (result.StatusCode == System.Net.HttpStatusCode.OK) {
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