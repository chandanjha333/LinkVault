import Url from '@/lib/models/Url';
import Click from '@/lib/models/Click';

export async function GET(req: Request, {params}: { params : { shortId: string } }) {
  const url = await Url.findOne({ shortId: params.shortId, isActive:true });
  if(!url) return new Response("Not Found", { status: 404 });

  Click.create({
    urlId: url._id,
    referrer: req.headers.get("referrer") ?? undefined,
    userAgent: req.headers.get("user-agent") ?? undefined,
  }).catch(() => {});
  Url.updateOne({ _id: url._id }, { $inc: { clickCount: 1 } }).catch(() => {});

  return Response.redirect(url.redirectUrl, 302);
}