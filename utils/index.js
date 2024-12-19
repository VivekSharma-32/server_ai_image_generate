const { createClient } = require("@supabase/supabase-js");

// create a supabase client
const supabaseURL = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseURL, supabaseKey);

async function uploadBase64ToImage(base64Data) {
  try {
    // const base64Image = `data:image/jpeg;base64,${base64Data}`;
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}`;

    const buffer = Buffer.from(base64Data, "base64");

    const { data, error } = await supabase.storage
      .from("dream-ai")
      .upload(`public/${fileName}.png`, buffer, {
        contentType: "image/jpeg",
      });

    if (error) {
      throw error;
    }

    const imageUrl = `${supabaseURL}/storage/v1/object/public/${data.fullPath}`;
    return imageUrl;
  } catch (error) {
    console.log("Error: ", error);
  }
}

module.exports = uploadBase64ToImage;
