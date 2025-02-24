const { getSettings } = require("@schemas/Guild");
const { EmbedBuilder } = require("discord.js");

/**
 * Log when emoji is created
 * @param {import("@structures/BotClient")} client
 * @param {import("discord.js").GuildEmoji} emoji
 */
module.exports = async (client, emoji) => {
  const settings = await getSettings(emoji.guild);
  if (!settings.logging.emojis) return;
  const logChannel = client.channels.cache.get(settings.logging.emojis);
  if (!logChannel) return;
  const embed = new EmbedBuilder()
    .setAuthor({ name: "Emoji Added" })
    .setTitle(`${emoji} was added!`)
    .setColor("Green")
    .setThumbnail(emoji.imageURL())
    .setDescription(
      `- **Emoji Name:** ${emoji.name}\n- **Animated:** ${emoji.animated}\n- **Added by**: ${emoji.author}`
    )
    .setFooter({ text: `ID: ${emoji.id}` })
    .setTimestamp();

  logChannel.send({ embeds: [embed] });
};
