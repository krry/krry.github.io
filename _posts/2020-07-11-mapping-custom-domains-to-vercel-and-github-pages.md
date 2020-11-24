---
layout: post
title: Configuring our Custom Domains with Github Pages and Vercel
author: Kerrbear
date: 2020-07-10 03:21:00 -0700
---

Today is an auspicious day. I have figured out how to map these Atmanaut
domains! It wasn't technically difficult. The challenge lay in understanding
what Atmanautica is offering to the WWW. And though this is likely to change as the concept evolves, I have to start somewhere.

While I wait for the nameservers to propagate these new DNS records across
the world wide web, let's discuss how I set up these custom domains and
deploy the sites to them.

# Atmanauts Assemble

Today Atmanautica covers three related domains.

- I have my folio here at [Atmanautica.com](https://atmanautica.com). This domain is where I work.
- My blog, a more personal endeavor, now can be perused at [Atmanaut.me](https://atmanaut.me).  Atmanaut.me is where I muse and play.
- And one day I hope to host a community at [Atmanaut.us](https://atmanaut.us). Atmanaut.us is where we can gather the tribe and try out new concepts. Edit: the [New And Ancient Story community](https://naascommunity.org) has been a warm and welcoming environment during these quarantimes. My hopes for this domain have all but been fulfilled there.

## Mapping our Github Pages Organization site to a Custom Domain

This folio was built using Jekyll to be hosted on [Github Pages](https://docs.github.com/en/github/working-with-github-pages). That allows
me to maintain and publish this site by pushing commits to the main branch of a
repo named `Atmanautica.github.io`, so named because **Atmanautica** is the
name of the Github org. By default, Github Pages will publish that
main branch of that repo to that domain, which I want to map to our custom
domain, `atmanautica.com`. Let's take this step-by-step.

1. Build a Jekyll site.
2. Commit that Jekyll site to a repo named `<organization>.github.io` that is
   owned by the Github organization. [This triggers Github Pages auto-publish](https://docs.github.com/en/github/working-with-github-pages/about-github-pages#types-of-github-pages-sites).
3. Add a file called `CNAME` to the repo root which contains the custom
   domain. Our CNAME file contains simply `www.atmanautica.com`.
4. Head to our domain registrar to add two DNS records.
5. Reflect the CNAME file with a CNAME record.

  | type | host | value | TTL |
  |:----:|:----:|:-----:|:---:|
  |CNAME | www  | atmanautica.github.io | 30min |

6. Then [ALIAS the apex domain](https://docs.github.com/en/github/working-with-github-pages/about-custom-domains-and-github-pages#using-an-apex-domain-for-your-github-pages-site) to this site.

  | type | host | value | TTL |
  |:----:|:----:|:-----:|:---:|
  |ALIAS | @    | atmanautica.github.io | 30min |

Then we let the dust settle. As these records propagate throughout the web,
the custom domain comes alive.

There are a few desirable consequences of this configuration.

Now if someone goes to either atmanautica.com or www.atmanautica.com, they
find our folio. If they try atmanautica.com/some_route_we_dont_use, they will
see a custom 404 page, thanks to Jekyll and Github Pages. If I publish a new
repo with a `gh-pages` branch, its contents will be automatically hosted at
`https://www.atmanautica.com/repo-name`. That way I can spin up static prototypes for our clients on our domain in a jiffy.

## Publishing Static Sites on Custom Domains with Vercel

Vercel used to be Zeit, and their static site hosting platform used to be
called `now`. I've been hosting prototypes and such with **Zeit** for years.
It's been hard to beat their dead simple CLI deployment. Even Netlify doesn't hold a candle to it, IMHO.

In the old days, we would configure `now.json` and then deploy with Now's
lovely CLI. Now, as Vercel, wants us to use their web interface. They fill my
console with warnings of deprecation. This might mean I will one day mosey on to a
more dev friendly host. But for now, I'll give the old mouse a few clicks. So
on we go to the [Vercel Domains
dashboard](https://vercel.com/dashboard/domains). I'll spare you the details,
[there isn't much to it](https://vercel.com/docs/v2/custom-domains).

## Taking Sanity to the Next.js Level

All this aside, I'm quite excited about [Sanity.io](https://www.sanity.io/) which I am using for my new personal projects, Full Smile World and Full Smile Monster, and my home CMS. If all goes well, I'll migrate all these sites into Sanity where I can manage my content from anywhere, customize the admin tools (what they call the Studio), and curate the graph with hand-crafted schemas. Next I'll be diving into [the Next.js landing page demo](https://www.sanity.io/guides/the-landing-page-template) to see how the pudding is made. Edit: that dive surfaced as [Easeness.business](https://easeness.business).
