// Create a separate utility file to handle ID encoding/decoding
// utils/idUtils.js

/**
 * Obfuscate a MongoDB ObjectId for use in URLs
 * @param {string} id - The MongoDB ObjectId to obfuscate
 * @returns {string} - The obfuscated ID safe for URLs
 */
const obfuscateId = (id) => {
  // Convert MongoDB ObjectId to a more complex string that's harder to reverse-engineer
  const encodedId = Buffer.from(id.toString()).toString('base64');
  return encodedId.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, ''); // URL safe
};

/**
 * Deobfuscate a previously obfuscated ID back to its original form
 * @param {string} obfuscatedId - The obfuscated ID from the URL
 * @returns {string} - The original MongoDB ObjectId
 */
const deobfuscateId = (obfuscatedId) => {
  try {
    // Restore URL-safe characters to base64 format
    const base64Id = obfuscatedId.replace(/-/g, '+').replace(/_/g, '/');
    // Add padding if needed
    const paddedId = base64Id + '='.repeat((4 - base64Id.length % 4) % 4);
    // Decode from base64
    return Buffer.from(paddedId, 'base64').toString();
  } catch (error) {
    console.error('Error decoding ID:', error);
    return null;
  }
};

module.exports = {
  obfuscateId,
  deobfuscateId
};