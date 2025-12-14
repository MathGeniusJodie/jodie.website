const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand } = require("@aws-sdk/lib-dynamodb");
const nodemailer = require("nodemailer");
const fs = require("fs");

// 1. Initialize the Client
const client = new DynamoDBClient({ region: "us-east-1" }); // Replace with your region
const docClient = DynamoDBDocumentClient.from(client);

// Email configuration
const transporter = nodemailer.createTransport({
  host: "127.0.0.1",
  port: 1025,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  }
});

function extractFirstArticle(html) {
  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/);
  if (articleMatch) {
    return articleMatch[0];
  }
  return null;
}

async function getAllItems(tableName) {
  let items = [];
  let lastEvaluatedKey = undefined;

  try {
    do {
      // 2. Configure the Scan Command
      const params = {
        TableName: tableName,
        ExclusiveStartKey: lastEvaluatedKey, // Used for pagination
      };

      const command = new ScanCommand(params);
      const response = await docClient.send(command);

      // 3. Add items to our array
      if (response.Items) {
        items.push(...response.Items);
      }

      // 4. Update the key for the next loop
      lastEvaluatedKey = response.LastEvaluatedKey;
      
      console.log(`Fetched ${items.length} items so far...`);

    } while (lastEvaluatedKey); // Continue while there are more items to fetch

    return items;

  } catch (error) {
    console.error("Error scanning table:", error);
    throw error;
  }
}

// Usage
(async () => {
  const TABLE_NAME = "jodie.website_mailing_list";
  let allData = await getAllItems(TABLE_NAME);
  console.log("Total Items Found:", allData.length);
  
  // Read index.html and extract first article
  const indexHtml = fs.readFileSync("index.html", "utf-8");
  const articleHtml = extractFirstArticle(indexHtml);
  
  if (!articleHtml) {
    console.error("No article found in index.html");
    return;
  }
  
  // Extract title from article
  const titleMatch = articleHtml.match(/<h3[^>]*>([\s\S]*?)<\/h3>/);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '').trim() : "New Blog Post";
  
  const baseUrl = "https://cmqwdoiqfdn2zm4jaof3y7mika0bunee.lambda-url.us-east-1.on.aws/";

  //allData = [{EmailAddress: "mail@jodie.website", SecretCode: "testcode"}]; // For testing
  
  // Send email to each subscriber
  for (const item of allData) {
    const unsubscribeLink = `${baseUrl}?email=${encodeURIComponent(item.EmailAddress)}&code=${item.SecretCode}`;
    
    const emailHtml = `
<!DOCTYPE html>
<html>
<body>
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px">
<tr>
<td>
  ${articleHtml}
  <div class="unsubscribe">
    <hr/>
    <p><a href="${unsubscribeLink}">Unsubscribe</a></p>
  </div>
</td>
</tr>
</table>
</body>
</html>`;

    try {
      await transporter.sendMail({
        from: '"Jodie\'s Blog" <' + process.env.EMAIL_USER + '>',
        to: item.EmailAddress,
        subject: `New Post: ${title}`,
        html: emailHtml,
      });
      console.log(`✓ Sent to ${item.EmailAddress}`);
    } catch (error) {
      console.error(`✗ Failed to send to ${item.EmailAddress}:`, error.message);
    }
  }
  
  console.log("Done sending emails!");
})();
