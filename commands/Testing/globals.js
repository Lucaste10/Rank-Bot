const fs = require('fs');
const path = require('path');

const webhookIdsFilePath = path.join(__dirname, 'webhookIds.json');

// Load webhookIds from file or initialize as an empty array
let webhookIds = [];

// Function to save webhookIds to a file
function saveWebhookIdsToFile() {
  fs.writeFileSync(webhookIdsFilePath, JSON.stringify(webhookIds), 'utf8');
  console.log('webhookIds saved to file');
}

// Function to load webhookIds from a file
function loadWebhookIdsFromFile() {
  if (fs.existsSync(webhookIdsFilePath)) {
    webhookIds = JSON.parse(fs.readFileSync(webhookIdsFilePath, 'utf8'));
    console.log('webhookIds loaded from file');
  }
}

module.exports = {
    webhookIds,
    loadWebhookIdsFromFile,
    saveWebhookIdsToFile,
};