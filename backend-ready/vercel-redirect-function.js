export default async function handler(req, res) {
    const { alias } = req.query;

    const { data, error } = await supabase
        .from("links")
        .select("long_url, clicks")
        .eq("alias", alias)
        .single();

    if (!data) {
        return res.status(404).send("Link not found");
    }

    await supabase
        .from("links")
        .update({ clicks: data.clicks + 1 })
        .eq("alias", alias);

    return res.redirect(data.long_url);
}
