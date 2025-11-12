'use client';
import React, { useMemo, useState } from "react";
import Image from "next/image";


const CONFERENCES = ["Todas", "Leste", "Oeste"] as const;

type Conference = typeof CONFERENCES[number];
type SortMode = "NONE" | "AZ" | "ZA" | "TITLES_DESC" | "TITLES_ASC";

export type Team = {
  id: string;
  name: string;
  city: string;
  arena: string;
  conference: "Leste" | "Oeste";
  founded: number;
  championships: number;
  history: string;
  uniforms: {
    home: string;
    away: string;
    alt?: string
  };
  colors: string[];
  logo: string;
  images?: {
    arena?: string;
    mascot?: string;
    uniform?: string;
  };
};



export const TEAMS: Team[] = [
  // ---------------------- CONFERÊNCIA LESTE ----------------------
  {
    id: "atl",
    name: "Atlanta Hawks",
    city: "Atlanta, GA",
    arena: "State Farm Arena",
    conference: "Leste",
    founded: 1946,
    championships: 1,
    history: "Fundado em 1946 como Buffalo Bisons, o time mudou rapidamente para Tri-Cities Blackhawks e depois para Milwaukee antes de se estabelecer em Atlanta em 1968. Sua história é marcada por muitas mudanças e pela conquista de um único título da NBA, em 1958, quando ainda era o St. Louis Hawks, liderado por Bob Pettit — o primeiro grande astro da franquia. Nas décadas seguintes, o time teve ídolos como Dominique Wilkins, conhecido por suas enterradas espetaculares, e mais recentemente Trae Young, que reacendeu o entusiasmo da torcida. Apesar de raramente figurar entre os grandes campeões, os Hawks são conhecidos por sua energia jovem e estilo ofensivo empolgante.",
    uniforms: {
      home: "https://preview.redd.it/trae-young-4-cancelled-adidas-contract-officially-terminated-v0-bxrt1gokoj0e1.jpg?width=640&crop=smart&auto=webp&s=fc89022f013c5682778e65b29d6b4117bdf4aa35",
      away: "https://thespun.com/.image/w_3840,q_auto:good,c_limit/MTg3NDI1NjkwMzY1OTI5MDIw/washington-wizards-v-atlanta-hawks.jpg"
    },
    colors: ["#E03A3E", "#C1D32F", "#26282A"],
    logo: "https://upload.wikimedia.org/wikipedia/en/2/24/Atlanta_Hawks_logo.svg",
    images: {
      arena: "https://content.presspage.com/uploads/1441/1920_statefarmarenabrow.jpg?10000",
      mascot: "https://i.pinimg.com/736x/22/f8/aa/22f8aac19f9dfd6793b9a2aa1d0f7257.jpg"
    }
  },
  {
    id: "bos",
    name: "Boston Celtics",
    city: "Boston, MA",
    arena: "TD Garden",
    conference: "Leste",
    founded: 1946,
    championships: 18,
    history: "Poucos nomes são tão lendários quanto o dos Boston Celtics. Fundado em 1946, o time é sinônimo de tradição e glória, sendo o maior campeão da NBA, com 17 títulos (empatado com os Lakers). Sob o comando do mítico técnico Red Auerbach, os Celtics dominaram os anos 50 e 60, conquistando 11 títulos em 13 temporadas, com Bill Russell como principal símbolo de liderança e defesa. Nas décadas seguintes, brilhou o trio Larry Bird, Kevin McHale e Robert Parish, que manteve Boston no topo nos anos 80. Depois de um período de reconstrução, o renascimento veio com o “Big Three” de Paul Pierce, Kevin Garnett e Ray Allen, campeões em 2008. Hoje, com Jayson Tatum e Jaylen Brown, o time mantém viva sua dinastia.",
    uniforms: {
      home: "https://d1l5jyrrh5eluf.cloudfront.net/wp-content/uploads/2023/02/GettyImages-1457819281-scaled.jpg",
      away: "https://s2-ge.glbimg.com/pQt-6llzIB20v7S2FtLw9jkO2XM=/0x0:1024x733/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2025/V/G/hzi6j0Sdawo6y7ALRngg/gettyimages-2205296764.jpg"
    },
    colors: ["#007A33", "#BA9653", "#FFFFFF"],
    logo: "https://upload.wikimedia.org/wikipedia/en/8/8f/Boston_Celtics.svg",
    images: {
      arena: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/TD_Garden_%28crop%29.JPG/1200px-TD_Garden_%28crop%29.JPG",
      mascot: "https://pbs.twimg.com/profile_images/1228176781699506176/CNwAEmEW_400x400.jpg"
    }
  },
  {
    id: "bkn",
    name: "Brooklyn Nets",
    city: "Brooklyn, NY",
    arena: "Barclays Center",
    conference: "Leste",
    founded: 1967,
    championships: 0,
    history: "A franquia nasceu em 1967 como New Jersey Americans, jogando na ABA. Pouco depois virou New York Nets, e com o astro Julius Erving (Dr. J), conquistou dois títulos da ABA. Ao ingressar na NBA em 1976, passou por altos e baixos, alternando entre New York e New Jersey, até se mudar definitivamente para Brooklyn em 2012. Com o novo nome e identidade moderna, tentou formar supertimes com estrelas como Kevin Durant, Kyrie Irving e James Harden, mas sem sucesso em playoffs. Ainda assim, o projeto trouxe relevância e glamour à franquia, que agora busca reconstruir seu caminho com jovens talentos.",
    uniforms: {
      home: "https://brooklyneagle.com/wp-content/uploads/2025/02/Thomas-AP-Photo-by-Pamela-Smith-scaled.jpg",
      away: "https://s.yimg.com/ny/api/res/1.2/ZqVOcyZK.heu5MDxnZRTlw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQzMztjZj13ZWJw/https://media.zenfs.com/en/ny_post_sports_articles_389/1149ce9ccce4396a5544c8392e66c886"
    },
    colors: ["#000000", "#FFFFFF"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Brooklyn_Nets_newlogo.svg",
    images: {
      arena: "https://images.ctfassets.net/1aemqu6a6t65/7nvn3T4QWzB1u76zfeGCuP/307728f5434f06328ba8e43334d5d2c4/Barclays-Center-Brooklyn-NYC-Photo-Courtesy-Barclays-Center-3.jpg",
      mascot: ""
    }
  },
  {
    id: "cha",
    name: "Charlotte Hornets",
    city: "Charlotte, NC",
    arena: "Spectrum Center",
    conference: "Leste",
    founded: 1988,
    championships: 0,
    history: "O basquete profissional chegou a Charlotte em 1988 com os Hornets, que rapidamente conquistaram fãs com o carisma de Muggsy Bogues e Larry Johnson. Após a mudança para New Orleans em 2002, a cidade ficou sem time até 2004, quando surgiu o Charlotte Bobcats. Em 2014, a franquia recuperou o nome Hornets, restaurando sua identidade original. Sob a liderança do lendário Michael Jordan como proprietário, o time tem buscado consistência, com promessas como LaMelo Ball liderando o futuro. Apesar da falta de títulos, os Hornets são símbolo do amor de Charlotte pelo basquete.",
    uniforms: {
      home: "https://legacymedia.sportsplatform.io/image/upload/x_0,y_372,w_1800,h_1195,c_crop/v1677604113/rllpv9ygolfolczd1tlo.jpg",
      away: "https://images2.minutemediacdn.com/image/upload/c_crop,w_5459,h_3070,x_0,y_200/c_fill,w_1200,ar_4:3,f_auto,q_auto,g_auto/images/ImagnImages/mmsport/all_hornets/01jjapma47p7807w1e4b.jpg"
    },
    colors: ["#1D1160", "#00788C", "#A1A1A4"],
    logo: "https://upload.wikimedia.org/wikipedia/en/c/c4/Charlotte_Hornets_%282014%29.svg",
    images: {
      arena: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Spectrum_Center_2018.jpg",
      mascot: "https://i.pinimg.com/474x/e0/af/f1/e0aff1633bdc3e56e906e03fd7e55069.jpg"
    }
  },
  {
    id: "chi",
    name: "Chicago Bulls",
    city: "Chicago, IL",
    arena: "United Center",
    conference: "Leste",
    founded: 1966,
    championships: 6,
    history: "Fundado em 1966, os Chicago Bulls se tornaram uma das franquias mais icônicas da história da NBA, principalmente graças a Michael Jordan, considerado o maior jogador de todos os tempos. Sob o comando do técnico Phil Jackson e com companheiros como Scottie Pippen e Dennis Rodman, Jordan levou os Bulls a seis títulos nos anos 90, incluindo dois tricampeonatos. O time virou um fenômeno mundial, misturando esporte e cultura pop. Após a era dourada, Chicago teve altos e baixos, com Derrick Rose trazendo esperança ao ser MVP em 2011. Hoje, os Bulls ainda buscam reviver os dias de glória.",
    uniforms: {
      home: "https://cdn.theplayoffs.news/wp-content/uploads/2023/08/nikola-vucevic-bulls-2023-getty-jpg.webp",
      away: "https://www.orlandosentinel.com/wp-content/uploads/2023/04/BIQ4DZC56RHDBJZSBIBIBGRVGA.jpg"
    },
    colors: ["#CE1141", "#000000"],
    logo: "https://upload.wikimedia.org/wikipedia/en/6/67/Chicago_Bulls_logo.svg",
    images: {
      arena: "https://img.vavel.com/b/estadio-8.jpeg",
      mascot: "https://media.nbcchicago.com/2019/09/benny-the-bullGettyImages-485096049.jpg?quality=85&strip=all&resize=1200%2C675"
    }
  },
  {
    id: "cle",
    name: "Cleveland Cavaliers",
    city: "Cleveland, OH",
    arena: "Rocket Mortgage FieldHouse",
    conference: "Leste",
    founded: 1970,
    championships: 1,
    history: "Criados em 1970, os Cavaliers viveram décadas de mediocridade até o surgimento de LeBron James, nascido em Akron, Ohio. Sua chegada em 2003 mudou tudo: ele levou o time às finais em 2007 e, após um retorno em 2014, conquistou o título histórico de 2016, o primeiro da franquia e um dos mais emocionantes da NBA, após reverter uma série 3–1 contra os Warriors. Antes e depois de LeBron, o time passou por longos períodos de reconstrução, mas hoje conta com jovens estrelas como Donovan Mitchell e Darius Garland, que mantêm viva a esperança em Cleveland.",
    uniforms: {
      home: "https://www.vmcdn.ca/f/files/shared/feeds/cp/2024/12/6f0d2337e655006b40533043a853429f20d1730b011e036157af1fc711a8d84b.jpg;w=960",
      away: "https://jumperbrasil.com.br/wp-content/uploads/2025/03/Donovan-Mitchell-7.webp"
    },
    colors: ["#860038", "#FDBB30", "#041E42"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Cleveland_Cavaliers_secondary_logo.svg/2373px-Cleveland_Cavaliers_secondary_logo.svg.png",
    images: {
      arena: "https://blog.ticketmaster.com/wp-content/uploads/step-inside-Rocket-Mortgage-FieldHouse.png",
      mascot: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXfQKvSkPfdm8PxlOPgOijulvAm-c2BuE3VBD-mTfaB6ld8YQjBnAdn0T5LEreoqpr4sIBipu_ZbreXhA5601Teg17dPcC4UPogr-YUi-GrXiBkjymHb3R9NIQG1duNFwsisTrxAZxXgG1CRx5LpDGuFoSM=s800?key=3Pq5nGwOewx6dPKCSPxq8Q"
    }
  },
  {
    id: "det",
    name: "Detroit Pistons",
    city: "Detroit, MI",
    arena: "Little Caesars Arena",
    conference: "Leste",
    founded: 1941,
    championships: 3,
    history: "Os Pistons nasceram em Fort Wayne, Indiana, em 1941, como um time de fábrica da empresa de pistões “Zollner”. Mudaram-se para Detroit em 1957 e construíram uma identidade de jogo físico e defesa intensa, especialmente nos anos 80 e início dos 90, com os “Bad Boys” — Isiah Thomas, Joe Dumars, Dennis Rodman e Bill Laimbeer — conquistando dois títulos (1989 e 1990). Em 2004, outra equipe coesa e defensiva, liderada por Chauncey Billups e Ben Wallace, surpreendeu o mundo ao bater os Lakers e erguer mais um troféu. Atualmente, Detroit aposta em jovens promessas para reconstruir seu legado.",
    uniforms: {
      home: "https://ballershoesdb-com.translate.goog/wp-content/uploads/CadeCunninghamPistons-Cropped-500x667.jpg?_x_tr_sl=en&_x_tr_tl=pt&_x_tr_hl=pt&_x_tr_pto=imgs",
      away: "https://cdn.theplayoffs.news/wp-content/uploads/2024/01/cade-cunningham-detroit-pistons-600x400.jpg"
    },
    colors: ["#C8102E", "#006BB6", "#BEC0C2"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/39/Logo_of_the_Detroit_Pistons.png",
    images: {
      arena: "https://cdn.nba.com/teams/uploads/sites/1610612765/2021/10/little_caesars_arena_aerial.jpg",
      mascot: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXf8HiJnaRdFrHhaixvfLp_WykGqwq9Q0IyQyrSyZwiGBBc7OZjvE5chqwKgC_r1dqaYe-3cTJVAExl0qUx482DytAa_IZbC7qOIV2n8h1BAXDhalkEc7D7CeqWEzvE3tP4qbsEmw3-C1NzazokTyOfNR9K-=s800?key=3Pq5nGwOewx6dPKCSPxq8Q"
    }
  },
  {
    id: "ind",
    name: "Indiana Pacers",
    city: "Indianapolis, IN",
    arena: "Gainbridge Fieldhouse",
    conference: "Leste",
    founded: 1967,
    championships: 0,
    history: "O time foi fundado em 1967 e brilhou na ABA, conquistando três títulos antes de se juntar à NBA em 1976. Com o ídolo Reggie Miller, os Pacers se tornaram uma potência do Leste nos anos 90 e início dos 2000, conhecidos pela rivalidade intensa com os Knicks e pelo episódio do “Malice at the Palace” em 2004. Embora nunca tenham vencido a NBA, os Pacers sempre foram símbolo de disciplina e lealdade à cidade de Indianápolis. Hoje, jovens como Tyrese Haliburton representam o futuro da franquia.",
    uniforms: {
      home: "https://media.newyorker.com/photos/684c6121f8ab91a4b1327db3/master/w_2560%2Cc_limit/Thomas_Haliburton.jpg",
      away: "https://s2-ge.glbimg.com/hH29_sdaTqNTANb8W2nZ6XIczpY=/0x0:1024x682/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2023/2/W/GuR1sKR1W6pisOJWaPCw/gettyimages-1794136913.jpg"
    },
    colors: ["#002D62", "#FDBB30"],
    logo: "https://upload.wikimedia.org/wikipedia/pt/e/ef/Indiana_Pacers.png",
    images: {
      arena: "https://upload.wikimedia.org/wikipedia/commons/6/67/Bankers_Life_Fieldhouse%2C_Indian%C3%A1polis%2C_Estados_Unidos%2C_2012-10-22%2C_DD_02.jpg",
      mascot: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXf2jUmIfqvInMt2axRGJ8u0y4djD_NGfOgdMwZdYIOy7YHAwkrpcK7m0XhcU_UQl4meGmFhipVuqvavrVtoheWhs163uAe50alKNfO3HiNwHUH0OW391jfWTcfAHbGxuh9pxfKcPVMmtkz0NdbKR1tPdctZ=s800?key=3Pq5nGwOewx6dPKCSPxq8Q"
    }
  },
  {
    id: "mia",
    name: "Miami Heat",
    city: "Miami, FL",
    arena: "Kaseya Center",
    conference: "Leste",
    founded: 1988,
    championships: 3,
    history: "Fundado em 1988, o Miami Heat se consolidou rapidamente entre as grandes franquias da liga. O primeiro título veio em 2006, com Shaquille O’Neal e Dwyane Wade. A consagração maior aconteceu entre 2010 e 2014, quando LeBron James, Wade e Chris Bosh formaram o lendário “Big Three”, levando dois títulos (2012 e 2013) e quatro finais consecutivas. Sob o comando de Erik Spoelstra e com a “cultura Heat” criada por Pat Riley, o time continua competitivo, chegando às finais novamente em 2020 e 2023 com Jimmy Butler.",
    uniforms: {
      home: "https://specials-images.forbesimg.com/imageserve/66c3455bfa8ebc7e263469a1/Tyler-Herro--Miami-Heat-/960x0.jpg?fit=scale",
      away: "https://cdn.theplayoffs.news/wp-content/uploads/2024/06/bam-adebayo-miami-heat.jpg"
    },
    colors: ["#98002E", "#F9A01B", "#000000"],
    logo: "https://upload.wikimedia.org/wikipedia/en/f/fb/Miami_Heat_logo.svg",
    images: {
      arena: "https://upload.wikimedia.org/wikipedia/commons/5/50/Kaseya_Center_Downtown_Miami_FL%2C_5_April_2024.jpg",
      mascot: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXciNkXLYcqNWy9vCeDnYyjg_36MWlwiFIPmimICzqWA4pvyc38-suAo4l1506F9yX5DR2iI5vsi2rVBbrR9quFqcd3jtPkCV9M9SXy22zpZPFR34jJTXvdUSz3V0FXkHSVmVhR5aoGC94_3sNQ1C-HwjmHQ=s800?key=3Pq5nGwOewx6dPKCSPxq8Q"
    }
  },
  {
    id: "mil",
    name: "Milwaukee Bucks",
    city: "Milwaukee, WI",
    arena: "Fiserv Forum",
    conference: "Leste",
    founded: 1968,
    championships: 2,
    history: "Os Bucks nasceram em 1968 e conquistaram rapidamente seu primeiro título, em 1971, com Kareem Abdul-Jabbar e Oscar Robertson. Após décadas sem sucesso, a franquia renasceu com Giannis Antetokounmpo, o “Greek Freak”, símbolo de superação e lealdade. Sob sua liderança, Milwaukee conquistou o título de 2021, encerrando um jejum de 50 anos. Com uma base sólida e torcida fiel, os Bucks são hoje uma das potências do Leste.",
    uniforms: {
      home: "https://jumperbrasil.com.br/wp-content/uploads/2024/11/Giannis-Antetokounmpo-5.webp",
      away: "https://playmakerbrasil.com.br/wp-content/uploads/2025/10/e0a61a8e-untitled-design-2025-10-09t101533.490.webp"
    },
    colors: ["#00471B", "#EEE1C6", "#0077C0"],
    logo: "https://upload.wikimedia.org/wikipedia/en/4/4a/Milwaukee_Bucks_logo.svg",
    images: {
      arena: "https://upload.wikimedia.org/wikipedia/commons/5/57/Milwaukee_Fiserv_Forum.jpg",
      mascot: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXc7foR0yfDCfCCBSVjwD5e6HGiewW1R3AQ8RX6yVY4Feja05y31CXzPQT2vKtzDK4lCNCY3IkC8c535fEHPvohx8yfaipSPSlS3fHfvyqaT58FLeqZZsfzWwTmJD1jhdEkSmm6Ne8LuEeu0d_o_-bLaswY=s800?key=3Pq5nGwOewx6dPKCSPxq8Q"
    }
  },
  {
    id: "nyk",
    name: "New York Knicks",
    city: "New York, NY",
    arena: "Madison Square Garden",
    conference: "Leste",
    founded: 1946,
    championships: 2,
    history: "Os Knicks são um dos times mais antigos da NBA, fundados em 1946 e baseados no lendário Madison Square Garden, o “Templo do Basquete”. Têm dois títulos (1970 e 1973) conquistados sob a liderança de Willis Reed e Walt Frazier, em uma era de ouro. Desde então, o time vive entre altos e baixos, com destaque para os anos 90 de Patrick Ewing e recentes renascimentos com Jalen Brunson e Julius Randle. Mesmo sem títulos recentes, os Knicks continuam sendo um dos times mais populares e icônicos do mundo.",
    uniforms: {
      home: "https://assets.newsweek.com/wp-content/uploads/2025/08/2445996-jalen-brunson.jpg?w=1600&quality=75&webp=1",
      away: "https://media.cnn.com/api/v1/images/stellar/prod/usatsi-23174159.jpg?c=16x9&q=h_833,w_1480,c_fill"
    },
    colors: ["#006BB6", "#F58426"],
    logo: "https://upload.wikimedia.org/wikipedia/en/2/25/New_York_Knicks_logo.svg",
    images: {
      arena: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Madison_Square_Garden_%28MSG%29_-_Full_%2848124330357%29.jpg",
      mascot: ""
    }
  },
  {
    id: "orl",
    name: "Orlando Magic",
    city: "Orlando, FL",
    arena: "Kia Center",
    conference: "Leste",
    founded: 1989,
    championships: 0,
    history: "Fundado em 1989, o Magic rapidamente chamou atenção ao selecionar Shaquille O’Neal e, depois, Penny Hardaway, chegando às finais de 1995. Em 2009, com Dwight Howard, voltou às finais, mas perdeu para o Lakers. Apesar de nunca ter vencido um título, o Magic se destaca por revelar grandes talentos e ser um dos símbolos do basquete na Flórida. A nova geração, liderada por Paolo Banchero, promete reviver os melhores dias da franquia.",
    uniforms: {
      home: "https://cdn.theplayoffs.news/wp-content/uploads/2023/02/paolo-banchero-magic-azul-getty.jpg",
      away: "https://www.orlandosentinel.com/wp-content/uploads/2024/02/Magic-Spurs-Basketball-1.jpg?w=525"
    },
    colors: ["#0077C0", "#C4CED4", "#000000"],
    logo: "https://upload.wikimedia.org/wikipedia/en/1/10/Orlando_Magic_logo.svg",
    images: {
      arena: "https://cdn.panrotas.com.br/portal-panrotas-statics/media-files-cache/385487/1adfae008707864b49ac95f5c0a2d013kiacenter240020231220/55,0,2345,1400/1206,720,0.29/0/default.jpg",
      mascot: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXe3FViPjfGE-JUrj8PLbLxbtJhfUYrgyWOGk9Ho-RZXv3MWWcr1u34fOVkHIBSX2x8kEUQkTiLEph0ARAVXsBtDj_5fe55ACXBPVzvyKCTUNrn-ZE07WqLds7tlHH8vtP0FwYzHGqSIps5Yt_bMspKpj3Y=s800?key=3Pq5nGwOewx6dPKCSPxq8Q"
    }
  },
  {
    id: "phi",
    name: "Philadelphia 76ers",
    city: "Philadelphia, PA",
    arena: "Wells Fargo Center",
    conference: "Leste",
    founded: 1946,
    championships: 3,
    history: "Herança de uma das franquias mais antigas da liga, os 76ers nasceram oficialmente em 1963, quando o Syracuse Nationals mudou para Filadélfia. Com lendas como Wilt Chamberlain, Julius Erving (Dr. J), Moses Malone e Allen Iverson, o time tem três títulos da NBA e uma tradição de estrelas carismáticas. Mais recentemente, o “Processo” — reconstrução liderada por Joel Embiid — trouxe o time de volta ao protagonismo. Os 76ers seguem firmes em busca de seu próximo título.",
    uniforms: {
      home: "https://media.cnn.com/api/v1/images/stellar/prod/230502112647-01-joel-embiid-041723.jpg?c=16x9&q=h_833,w_1480,c_fill",
      away: "https://images2.minutemediacdn.com/image/upload/c_crop,x_0,y_0,w_4509,h_2536/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/ImagnImages/mmsport/229/01jecf2th0b4pp6j2cne.jpg"
    },
    colors: ["#006BB6", "#ED174C", "#002B5C"],
    logo: "https://upload.wikimedia.org/wikipedia/en/0/0e/Philadelphia_76ers_logo.svg",
    images: {
      arena: "https://billypenn.com/wp-content/uploads/2023/08/sixers-arena-76place-rendering-2023aug-02.jpg",
      mascot: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXcLBY9jhKvik5-kyWF45y4y8PUPkX6ohMF_NcbpSijs_EAXsUcXPXnjaW8NkupXBAJ9dVfcKQxa4rBO20-Hyap2iaZK9--GQk1ip-VGdLwGP0wK2emXW5tfFY3zJKIeSVqNuD1Q9YWMs2XfsKIGtJ-yUqPv=s800?key=3Pq5nGwOewx6dPKCSPxq8Q"
    }
  },
  {
    id: "tor",
    name: "Toronto Raptors",
    city: "Toronto, ON",
    arena: "Scotiabank Arena",
    conference: "Leste",
    founded: 1995,
    championships: 1,
    history: "Criados em 1995 como parte da expansão da NBA no Canadá, os Raptors representaram um marco internacional para a liga. O time teve fases marcantes com Vince Carter, Chris Bosh e, mais recentemente, DeMar DeRozan. Em 2019, liderados por Kawhi Leonard, conquistaram o primeiro título da história do Canadá, derrotando os Warriors e escrevendo um capítulo histórico. Desde então, o time se manteve competitivo e consolidou Toronto como uma das torcidas mais apaixonadas da NBA.",
    uniforms: {
      home: "https://torontolife.mblycdn.com/tl/resized/2025/01/w1280/SCOTTIE_FINAL15.jpg",
      away: "https://preview.redd.it/scottie-barnes-was-shutting-down-some-of-the-best-players-v0-w9bxlv9l98if1.jpeg?width=640&crop=smart&auto=webp&s=7e950d7fe3ed1a92aa365fac6bc67c672bdb0485"
    },
    colors: ["#CE1141", "#000000", "#A1A1A4"],
    logo: "https://upload.wikimedia.org/wikipedia/en/3/36/Toronto_Raptors_logo.svg",
    images: {
      arena: "https://www.retailbankerinternational.com/wp-content/uploads/sites/2/2018/07/scotiabank-scaled.jpg",
      mascot: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXfWL6NX6dyvQ-NNN29OiiIeP6_tCTa4B_qa55VQU9GD3nFBaIq6jKgs8wtsll0KpkL2NYarbU5gIEbNz5bt-H_rP0Uk50fwdHPLaT_wiZT30i7glmXcwPdD3CoCF9QxqQLQmM1zkPXd7pAUJ01YlcvzztrH=s800?key=3Pq5nGwOewx6dPKCSPxq8Q"
    }
  },
  {
    id: "was",
    name: "Washington Wizards",
    city: "Washington, D.C.",
    arena: "Capital One Arena",
    conference: "Leste",
    founded: 1961,
    championships: 1,
    history: "A franquia teve muitos nomes e cidades: começou como Chicago Packers em 1961, virou Baltimore Bullets, depois Washington Bullets, até adotar o nome atual em 1997. O auge veio nos anos 70, com Elvin Hayes e Wes Unseld, campeões da NBA em 1978. Nos anos 2000, a chegada de Michael Jordan deu novo destaque à equipe, e depois Gilbert Arenas e John Wall trouxeram competitividade. Hoje, em reconstrução, o time aposta em juventude para reviver seus melhores momentos.",
    uniforms: {
      home: "https://upload.wikimedia.org/wikipedia/commons/5/50/2025_Washington_Wizards_Media_Day_13.jpg",
      away: "https://whatsupmag.com/downloads/82902/download/sport1.jpg?cb=35662fc59c6a954e6e060dfde71a7249&w=600"
    },
    colors: ["#002B5C", "#E31837", "#C4CED4"],
    logo: "https://upload.wikimedia.org/wikipedia/en/0/02/Washington_Wizards_logo.svg",
    images: {
      arena: "https://stadiumandarenavisits.com/wp-content/uploads/2022/04/capital-one-arena-3.jpg",
      mascot: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXfW4B2oNO3DYOaoq0yI2bF5oAoNClHcHKZn1fAuvE4s3c9j9XYjHT42iS7phEYw8_J-5-UNc9u51sptHlBV_hMNiz6NSh6TgJLlk0nvvtwmAiXJTzQJvy4r0BK2BLG6_DKWgXlExHqFdTR5kz1XjhiwE8g=s800?key=3Pq5nGwOewx6dPKCSPxq8Q"
    }
  },
  {
    id: "dal",
    name: "Dallas Mavericks",
    city: "Dallas, TX",
    arena: "American Airlines Center",
    conference: "Oeste",
    founded: 1980,
    championships: 1,
    history: "Fundado em 1980, o Dallas Mavericks rapidamente se tornou um dos times mais carismáticos da NBA. O auge inicial veio nos anos 2000 com Dirk Nowitzki, o astro alemão que revolucionou o jogo dos pivôs com seu arremesso de longa distância. Sob o comando de Rick Carlisle, Dirk liderou o time ao título de 2011, derrotando o poderoso Miami Heat de LeBron, Wade e Bosh em uma das conquistas mais marcantes da era moderna. Hoje, com Luka Dončić, o Mavs mantém o DNA europeu e ofensivo que o tornou uma das franquias mais admiradas.",
    uniforms: {
      home: "https://preview.redd.it/will-kyrie-irving-ever-be-regarded-as-one-of-the-top-10-v0-fft1hx140ire1.jpeg?width=1080&crop=smart&auto=webp&s=1544e288fa89323936afb8892e062739353ece55",
      away: "https://cdn.britannica.com/90/257790-050-1E89C7CB/Kyrie-Irving-Dallas-Mavericks-NBA-action-2024.jpg"
    },
    colors: ["#00538C", "#002B5E", "#B8C4CA"],
    logo: "https://upload.wikimedia.org/wikipedia/en/9/97/Dallas_Mavericks_logo.svg",
    images: {
      arena: "https://upload.wikimedia.org/wikipedia/commons/b/bc/American_Airlines_Center_August_2015.jpg",
      mascot: "https://media.nbcdfw.com/2024/06/GettyImages-1453288146.jpg?quality=85&strip=all&resize=1200%2C675"
    }
  },
  {
    id: "den",
    name: "Denver Nuggets",
    city: "Denver, CO",
    arena: "Ball Arena",
    conference: "Oeste",
    founded: 1967,
    championships: 1,
    history: "Criados em 1967 como Denver Rockets, os Nuggets adotaram o nome atual em 1974 e entraram na NBA em 1976. Durante décadas, tiveram bons times com Alex English e Carmelo Anthony, mas nunca alcançaram as finais. Isso mudou em 2023, quando Nikola Jokić, o “Joker”, liderou Denver ao primeiro título da história da franquia, com atuações históricas e um estilo de jogo coletivo e criativo. Hoje, os Nuggets são referência em consistência e trabalho de equipe.",
    uniforms: {
      home: "https://gsp-image-cdn.wmsports.io/cms/prod/bleacher-report/getty_images/2207972173_large_cropped_0.jpg",
      away: "https://theplayoffs.news/wp-content/uploads/2025/04/USATSI_25867415-600x410.jpg"
    },
    colors: ["#0E2240", "#FEC524", "#8B2131"],
    logo: "https://upload.wikimedia.org/wikipedia/en/7/76/Denver_Nuggets.svg",
    images: {
      arena: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Ball_Arena_exterior_2022.jpg",
      mascot: "https://www.si.com/.image/c_fill,w_1200,ar_1:1,f_auto,q_auto,g_auto/MTk4MzIwMjcxMTIyMzEwOTk3/rocky.jpg"
    }
  },
  {
    id: "gsw",
    name: "Golden State Warriors",
    city: "San Francisco, CA",
    arena: "Chase Center",
    conference: "Oeste",
    founded: 1946,
    championships: 7,
    history: "Um dos times mais antigos da NBA, fundado em 1946 como Philadelphia Warriors, a franquia passou por San Francisco e Oakland, conquistando títulos em todas as eras. Nos anos 60, brilhou com Wilt Chamberlain; nos 70, com Rick Barry; mas foi com Stephen Curry, Klay Thompson, Draymond Green e o técnico Steve Kerr que os Warriors criaram uma dinastia moderna. Entre 2015 e 2022, venceram quatro títulos, mudando o basquete com o estilo baseado em arremessos de três pontos e movimentação constante. São símbolo da revolução tática da NBA moderna.",
    uniforms: {
      home: "https://s2-oglobo.glbimg.com/I0QYJTx9TBklwunO54XzAivJ2g0=/0x0:1080x883/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2025/q/U/8h6ZIXS4iYQSb8SuA30w/curry.jpg",
      away: "https://library.sportingnews.com/styles/crop_style_16_9_desktop_webp/s3/2025-06/USATSI_26058637.jpg.webp?itok=2gIIregV"
    },
    colors: ["#1D428A", "#FFC72C"],
    logo: "https://upload.wikimedia.org/wikipedia/en/0/01/Golden_State_Warriors_logo.svg",
    images: {
      arena: "https://cdn.nba.com/teams/uploads/sites/1610612744/2024/08/New-Web-Hero-Our-Vision-in-About-Us.jpg",
      mascot: ""
    }
  },
  {
    id: "hou",
    name: "Houston Rockets",
    city: "Houston, TX",
    arena: "Toyota Center",
    conference: "Oeste",
    founded: 1967,
    championships: 2,
    history: "Fundado em 1967, o Houston Rockets construiu sua reputação com superestrelas. Nos anos 80, Hakeem Olajuwon, um dos pivôs mais habilidosos da história, levou o time a dois títulos consecutivos (1994 e 1995). Nos anos 2000, a dupla Yao Ming e Tracy McGrady atraiu atenção mundial, especialmente da China. Mais recentemente, James Harden transformou os Rockets em uma potência ofensiva, embora sem coroar com título. A equipe agora busca se reconstruir com jovens talentos e um estilo de jogo moderno.",
    uniforms: {
      home: "https://cdn.theplayoffs.news/wp-content/uploads/2025/09/USATSI_25082593-600x400.jpg",
      away: "https://www.mystateline.com/wp-content/uploads/sites/17/2024/11/Photo-VanVleet.jpg?w=1280"
    },
    colors: ["#CE1141", "#C4CED4", "#000000"],
    logo: "https://upload.wikimedia.org/wikipedia/en/2/28/Houston_Rockets.svg",
    images: {
      arena: "https://www.toyotacenter.com/assets/img/Toyota-Center-Arena-Slide-88e690888b.jpg",
      mascot: "https://cdn.nba.com/teams/legacy/www.nba.com/rockets/sites/rockets/files/gettyimages-1142105950.jpg?im=Resize=(640)"
    }
  },
  {
    id: "lac",
    name: "Los Angeles Clippers",
    city: "Los Angeles, CA",
    arena: "Intuit Dome",
    conference: "Oeste",
    founded: 1970,
    championships: 0,
    history: "Por muito tempo, os Clippers foram conhecidos como o “irmão menor” dos Lakers. Fundados em 1970 como Buffalo Braves, mudaram-se para San Diego e depois para Los Angeles em 1984. Durante décadas, foram sinônimo de azar e má gestão. A virada veio nos anos 2010, com o trio Chris Paul, Blake Griffin e DeAndre Jordan, os “Lob City”, que transformaram o time em espetáculo e levaram-no aos playoffs consistentemente. Hoje, com Kawhi Leonard e Paul George, os Clippers continuam buscando o primeiro título de sua história.",
    uniforms: {
      home: "https://heavy.com/wp-content/uploads/2025/05/Kawhi-Leonard.jpg?quality=65&strip=all",
      away: "https://a57.foxsports.com/statics.foxsports.com/www.foxsports.com/content/uploads/2025/01/1294/728/b9a398a9-kawhi1.jpg?ve=1&tl=1"
    },
    colors: ["#C8102E", "#1D428A", "#BEC0C2"],
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/Los_Angeles_Clippers_%282024%29.svg/1200px-Los_Angeles_Clippers_%282024%29.svg.png",
    images: {
      arena: "https://www.stadiumtechreport.com/wp-content/uploads/2023/10/Screen-Shot-2023-03-06-at-12.21.24-PM.png",
      mascot: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXd0nYGTeEoQXq373T2ac6REtNwYQaKF6c95pF30BWyfqd9TiX9jvsVb6_8q7-aKTfX_zla4uxsG-OkkRZZ453dhKc4n0vFU2mOtFga14JHIjlHueTGNYd70ZK2ULpz4QEf55aShVQuB5nVtsxpG400QJOQ=s800?key=3Pq5nGwOewx6dPKCSPxq8Q"
    }
  },
  {
    id: "lal",
    name: "Los Angeles Lakers",
    city: "Los Angeles, CA",
    arena: "Crypto.com Arena",
    conference: "Oeste",
    founded: 1947,
    championships: 17,
    history: "Talvez a franquia mais famosa da NBA, os Lakers nasceram em Minneapolis em 1947, onde ganharam cinco títulos com George Mikan. Em 1960, mudaram-se para Los Angeles, iniciando uma era de glamour e sucesso. Sob Jerry West e Wilt Chamberlain, vieram mais conquistas, seguidas da lendária era “Showtime” com Magic Johnson e Kareem Abdul-Jabbar, dominando os anos 80. Nos 2000, Kobe Bryant e Shaquille O’Neal marcaram outra dinastia, e mais recentemente, LeBron James e Anthony Davis conquistaram o 17º título em 2020, igualando os Celtics. Os Lakers são sinônimo de estrelas, títulos e espetáculo.",
    uniforms: {
      home: "https://preview.redd.it/lebron-james-will-become-the-1st-nba-player-to-play-23-v0-6magh14bn0jf1.jpeg?width=1080&crop=smart&auto=webp&s=51f7dfea6ffce4ee2bfda08f45f391acd979e54d",
      away: "https://gsp-image-cdn.wmsports.io/cms/prod/bleacher-report/getty_images/2211763519_large_cropped.jpg"
    },
    colors: ["#552583", "#FDB927", "#000000"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Los_Angeles_Lakers_logo.svg",
    images: {
      arena: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Crypto.com_Arena_exterior_2023.jpg/1200px-Crypto.com_Arena_exterior_2023.jpg",
      mascot: ""
    }
  },
  {
    id: "mem",
    name: "Memphis Grizzlies",
    city: "Memphis, TN",
    arena: "FedExForum",
    conference: "Oeste",
    founded: 1995,
    championships: 0,
    history: "Fundado em 1995 no Canadá como Vancouver Grizzlies, o time se mudou para Memphis em 2001. A franquia ganhou respeito com a era “Grit and Grind”, baseada em defesa e esforço, liderada por Marc Gasol, Zach Randolph e Mike Conley. Embora nunca tenha conquistado um título, o time se tornou símbolo de luta e identidade. A nova geração, com Ja Morant como astro, trouxe de volta a empolgação e o estilo explosivo, fazendo de Memphis um dos times mais jovens e promissores da liga.",
    uniforms: {
      home: "https://statico.profootballnetwork.com/wp-content/uploads/2025/09/18014536/eastern-conference-team-predicted-trade-09-18-25-1920x1312.jpg",
      away: "https://newr7-r7-prod.web.arc-cdn.net/resizer/v2/PCZWBMWZXRNRXP2Q6KR6IAPTRM.jpg?auth=0221668a7e4addf3141b87e2bd095365d78d175e358a3f9c4bfe6b1df1839fe3&width=1366&height=2048"
    },
    colors: ["#552583", "#FDB927", "#000000"],
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/Memphis_Grizzlies.svg/994px-Memphis_Grizzlies.svg.png",
    images: {
      arena: "https://upload.wikimedia.org/wikipedia/commons/b/ba/FedExForum_at_night.jpg",
      mascot: "https://images.squarespace-cdn.com/content/v1/5c6463897fdcb8d3e8cf7d9c/1560885111782-UAYY2R36HNVGRJXFGZ6O/grizz-memphis-grizzlies.jpg"
    }
  },
  {
    id: "min",
    name: "Minnesota Timberwolves",
    city: "Minneapolis, MN",
    arena: "Target Center",
    conference: "Oeste",
    founded: 1989,
    championships: 0,
    history: "Criado em 1989, o Timberwolves teve sua primeira era de sucesso com Kevin Garnett, MVP em 2004 e símbolo da garra da franquia. Após anos de ausência nos playoffs, o time renasceu com Karl-Anthony Towns, Anthony Edwards e um elenco atlético e talentoso. Embora ainda busque o primeiro título, Minnesota tem uma das torcidas mais fiéis e apaixonadas, que sonha em repetir a intensidade da era Garnett.",
    uniforms: {
      home: "https://res.cloudinary.com/usopc-prod/image/upload/v1713889467/TeamUSA%20Assets/Athlete%20Profiles/Anthony%20Edwards/Edwards_a_thumbnail.jpg",
      away: "https://cdn.britannica.com/57/258357-050-796B2EB0/anthony-edwards-of-minnesota-timberwolves-at-first-round-playoffs-2024.jpg"
    },
    colors: ["#0C2340", "#236192", "#9EA2A2"],
    logo: "https://upload.wikimedia.org/wikipedia/en/c/c2/Minnesota_Timberwolves_logo.svg",
    images: {
      arena: "https://www.minneapolis.org/imager/files_idss_com/C15/b58fff8e-440f-4248-b3df-91d54727320f_e45adf5f6bc0c5c2a30a39868f44eab6.jpg",
      mascot: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXd3WEFgmzcyxWOJugo4tlKMEKK6f4bVdsc4peWWFKLDj4mDxGj6n6nrr4bZjXwq5PtURiKCC5sqaqeTg8aMwSRfYJREx-waGVOS56vzHx28RIwIu3S-ETkrCrBsJmslYHJZ6lq-XeW-Xp6D8ZCkcx-yzPpm=s800?key=3Pq5nGwOewx6dPKCSPxq8Q"
    }
  },
  {
    id: "nop",
    name: "New Orleans Pelicans",
    city: "New Orleans, LA",
    arena: "Smoothie King Center",
    conference: "Oeste",
    founded: 2002,
    championships: 0,
    history: "Fundado em 2002 como New Orleans Hornets, o time adotou o nome Pelicans em 2013, em homenagem ao pássaro símbolo do estado da Louisiana. Teve momentos marcantes com Chris Paul e, depois, com o jovem fenômeno Anthony Davis, antes de iniciar nova fase com Zion Williamson e Brandon Ingram. Apesar de ser uma das franquias mais jovens da NBA, os Pelicans representam a energia e a resiliência de Nova Orleans, cidade que abraçou o time com orgulho.",
    uniforms: {
      home: "https://www.usatoday.com/gcdn/authoring/authoring-images/2023/12/21/USAT/72002692007-usatsi-22113050-168402560-lowres-1.jpg?crop=999,998,x298,y0",
      away: "https://athlonsports.com/.image/w_3840,q_auto:good,c_limit/MjY6MDAwMDAwMDAwODA3NjAz/usatsi_25566660.jpg"
    },
    colors: ["#0C2340", "#85714D", "#C8102E"],
    logo: "https://upload.wikimedia.org/wikipedia/en/0/0d/New_Orleans_Pelicans_logo.svg",
    images: {
      arena: "https://cloudfront-us-east-1.images.arcpublishing.com/gray/QLGYNXKJNNA6LMEY6KJ3LNMPQA.jpg",
      mascot: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXfkP9jdSKXALiqYm1f2gC9u03B5hp5OPOQdS1zr-zQwgZRxckGXiEb1MKF1fVYrayrtGMlo3B4UPBaZcdxYDOh55q8ZvO73DykS4LyDMo-p6jI8rjcO0ooEMrLoS1sBec361-cQEOePwlf6Mw0GsEz9aNyj=s800?key=3Pq5nGwOewx6dPKCSPxq8Q"
    }
  },
  {
    id: "okc",
    name: "Oklahoma City Thunder",
    city: "Oklahoma City, OK",
    arena: "Paycom Center",
    conference: "Oeste",
    founded: 1967,
    championships: 1,
    history: "A história do Thunder começou como Seattle SuperSonics, fundados em 1967 e campeões da NBA em 1979. Em 2008, a franquia se mudou para Oklahoma City, onde viveu uma era brilhante com Kevin Durant, Russell Westbrook e James Harden, chegando às finais em 2012. Mesmo após a saída das estrelas, o Thunder continua sendo exemplo de reconstrução inteligente e foco em jovens talentos. A torcida de OKC é uma das mais intensas da liga, símbolo da paixão pelo basquete em pequenas cidades.",
    uniforms: {
      home: "https://www.infomoney.com.br/wp-content/uploads/2025/05/2025-05-16T020502Z_472342399_MT1USATODAY26188481_RTRMADP_3_NBA-PLAYOFFS-OKLAHOMA-CITY-THUNDER-AT-DENVER-NUGGETS.jpg?fit=1265%2C844&quality=50&strip=all",
      away: "https://lwosports.com/wp-content/uploads/2024/05/USATSI_23317580_168400545_lowres-1024x643.jpg"
    },
    colors: ["#007AC1", "#EF3B24", "#FDBB30"],
    logo: "https://upload.wikimedia.org/wikipedia/en/5/5d/Oklahoma_City_Thunder.svg",
    images: {
      arena: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Paycom_Center.jpg",
      mascot: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXfMLq27nJFJe2WssGVCXP21ccaOmeS8poSPTTX4oz2sMBRPrf26JKZRB7ZEqH-zLw0Zs4krQs2KTDbBG63T64j4qNmg2OWFnSKJWdxh1-yiP3bZkcGKLVlaEBRTnMPu99GMOmsLogm0LPtHYi_kYw2S-ebv=s800?key=3Pq5nGwOewx6dPKCSPxq8Q"
    }
  },
  {
    id: "phx",
    name: "Phoenix Suns",
    city: "Phoenix, AZ",
    arena: "Footprint Center",
    conference: "Oeste",
    founded: 1968,
    championships: 0,
    history: "Criados em 1968, os Suns sempre foram conhecidos por seu basquete veloz e criativo. Tiveram grandes times nos anos 90 com Charles Barkley, e depois nos anos 2000 com Steve Nash, bicampeão de MVP e líder do revolucionário estilo “Seven Seconds or Less”. Após anos difíceis, o time renasceu em 2021, chegando às finais com Devin Booker e Chris Paul, embora sem conquistar o título. Hoje, com Kevin Durant e Bradley Beal, os Suns seguem como uma das equipes mais talentosas da NBA.",
    uniforms: {
      home: "https://substackcdn.com/image/fetch/$s_!7fFL!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3cd3f21f-93f0-40da-831d-7ca7995a24d9_1172x1410.jpeg",
      away: "https://img.olympics.com/images/image/private/t_1-1_300/f_auto/primary/yvfd8z3sfju9hjdqbr82"
    },
    colors: ["#1D1160", "#E56020", "#63727A"],
    logo: "https://upload.wikimedia.org/wikipedia/en/d/dc/Phoenix_Suns_logo.svg",
    images: {
      arena: "https://upload.wikimedia.org/wikipedia/commons/5/54/Footprint_Center_2022.jpg",
      mascot: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXfIgiu9ZjtWW-5JgmOIQQdQEp8xiCPhxtyGeS6vJ-fJtaE_f2g-pnaoTW_K0kKV9mZ0nceE0A_yosNQ98nG9hQXJpg2Agb8fxesFDM-abJrC43xzrtOnvRmEDB3NOGgB88yvwskzZ8rsLvalcANmosispXL=s800?key=3Pq5nGwOewx6dPKCSPxq8Q"
    }
  },
  {
    id: "por",
    name: "Portland Trail Blazers",
    city: "Portland, OR",
    arena: "Moda Center",
    conference: "Oeste",
    founded: 1970,
    championships: 1,
    history: "Desde 1970, os Blazers são um dos times mais queridos da NBA, com uma das torcidas mais leais. Em 1977, liderados por Bill Walton, conquistaram seu único título. Nas décadas seguintes, nomes como Clyde Drexler e Damian Lillard marcaram gerações. Conhecidos pela cultura forte e pelo lema “Rip City”, os Blazers simbolizam dedicação, resiliência e amor pelo basquete do noroeste americano.",
    uniforms: {
      home: "https://playmakerbrasil.com.br/wp-content/uploads/2025/07/QBNUR7GT7BAZHHKNP6UQ4PKCSA-scaled.jpg",
      away: "https://s2-ge.glbimg.com/x6y---BgnBBZiH8wVy0RLMFklyw=/0x0:3841x2560/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2020/4/O/GZrprZThyCG6zXie0nGg/gettyimages-1200861996.jpg"
    },
    colors: ["#E03A3E", "#000000"],
    logo: "https://upload.wikimedia.org/wikipedia/en/2/21/Portland_Trail_Blazers_logo.svg",
    images: {
      arena: "https://cdn.prod.website-files.com/62aa5d3f408f16380f0ddb52/62be0b2aafe7b2f9f3c7d711_moda.jpg",
      mascot: "https://advertisingweek.com/wp-content/uploads/2024/04/169blazeanddoug.jpg"
    }
  },
  {
    id: "sac",
    name: "Sacramento Kings",
    city: "Sacramento, CA",
    arena: "Golden 1 Center",
    conference: "Oeste",
    founded: 1923,
    championships: 1,
    history: "O time mais antigo em atividade contínua na NBA, fundado em 1923 como Rochester Royals, mudou várias vezes de cidade até se tornar o Sacramento Kings em 1985. Campeões em 1951, viveram seu auge moderno no início dos anos 2000, com Chris Webber, Mike Bibby e Peja Stojaković, encantando o público com um estilo coletivo e divertido. Após um longo jejum de playoffs, a nova geração liderada por De’Aaron Fox e Domantas Sabonis devolveu alegria à capital da Califórnia.",
    uniforms: {
      home: "https://static01.nyt.com/images/2023/04/05/multimedia/00nba-kings-sabonis-01-mjzl/00nba-kings-sabonis-01-mjzl-mediumSquareAt3X.jpg",
      away: "https://s.yimg.com/ny/api/res/1.2/mxdVRrV3K6hD9bWdp7xUYQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQyNztjZj13ZWJw/https://media.zenfs.com/en/athlon_sports_articles_610/3109b9562307cadc1f51e25e488d0658"
    },
    colors: ["#5A2D81", "#63727A", "#000000"],
    logo: "https://upload.wikimedia.org/wikipedia/pt/c/c7/Sacramento_Kings.png",
    images: {
      arena: "https://www.golden1center.com/wp-content/uploads/2023/08/Rectangle-413.png",
      mascot: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXegqOz-RwhUe-1EyIGvuHWagvOroAtRr0up4z1vZuOVNupFAhPe2yXhjBGEiNtpo_ghZb0PTYAo6pb41lblDM5oqMw1izNuo4__9m4NBHiWSopc9jaivgTJoF90peMs8KTwm_qymdblG1o5iL_cwAX09sTo=s800?key=3Pq5nGwOewx6dPKCSPxq8Q"
    }
  },
  {
    id: "sas",
    name: "San Antonio Spurs",
    city: "San Antonio, TX",
    arena: "Frost Bank Center",
    conference: "Oeste",
    founded: 1967,
    championships: 5,
    history: "Fundado em 1967, o Spurs é um exemplo de excelência e constância. Sob o técnico Gregg Popovich, o time criou uma das maiores dinastias da NBA, com cinco títulos (1999, 2003, 2005, 2007 e 2014), baseados em disciplina e jogo coletivo. Tim Duncan, Tony Parker e Manu Ginóbili formaram o lendário “Big Three”. Após alguns anos de reconstrução, o Spurs reencontrou esperança com o talento geracional de Victor Wembanyama, visto como o novo pilar do futuro.",
    uniforms: {
      home: "https://i.metroimg.com/ouMZjR1eSRyyxO_33UmzXOJ5gnhKbwNwcq2ofMtsP3o/w:600/q:85/f:webp/plain/2024/07/27145550/Victor-Wembanyama-alienigena.jpeg",
      away: "https://mim.p7s1.io/pis/ld/5bd3zChLCVyZ-c1vEwXZAanB-DJ78rnq2V2gRWTHzVV6NywNWMSJCEGmZ4YSENP-WRL0b9lo2zmFQhUvrcO62GQHEQnf2O08G5cmzDDb0OKmnSXUfQNkBaV_i73krNhgaPpcxnplzX8/profile:original?w=1070&rect=0%2C277%2C5468%2C3076"
    },
    colors: ["#C4CED4", "#000000", "#808080"],
    logo: "https://upload.wikimedia.org/wikipedia/en/a/a2/San_Antonio_Spurs.svg",
    images: {
      arena: "https://blog.ticketmaster.com/wp-content/uploads/step-inside-frost-bank-center.png",
      mascot: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXdpXdq8qlIciQifHrswJqyKv7YAnEr-ILBMyE9RnY5RS_aKVXmYeQ1LPHHGQood98AL0CfgL4G0MMlQap5KCm5yUcLOaYukCapLT2gD_39BngWPE1w3dqFnJ00VL3VNiylo3alZPuFykI9WvLYwT34SVKNw=s800?key=3Pq5nGwOewx6dPKCSPxq8Q"
    }
  },
  {
    id: "uta",
    name: "Utah Jazz",
    city: "Salt Lake City, UT",
    arena: "Delta Center",
    conference: "Oeste",
    founded: 1974,
    championships: 0,
    history: "O Jazz nasceu em 1974 em New Orleans, mas se mudou para Utah em 1979. Conhecido por seu ambiente único e apaixonado, o time brilhou nos anos 90 com a dupla Karl Malone e John Stockton, chegando a duas finais consecutivas contra os Bulls de Jordan. Embora ainda não tenha um título, o Jazz é sinônimo de consistência, cultura tática e desenvolvimento de talentos. Hoje, busca nova identidade com jovens promissores e forte base defensiva.",
    uniforms: {
      home: "https://jumperbrasil.com.br/wp-content/uploads/2024/06/Lauri-Markkanen_Easy-Resize.com_.jpg",
      away: "https://i.eurosport.com/2023/04/25/3690552-75100968-2560-1440.jpg"
    },
    colors: ["#002B5C", "#F9A01B", "#00471B"],
    logo: "https://upload.wikimedia.org/wikipedia/en/5/52/Utah_Jazz_logo_2022.svg",
    images: {
      arena: "https://blog.ticketmaster.com/wp-content/uploads/step-inside-delta-center.png",
      mascot: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXcSz1opuebdOFuDFBm8qC_kP1YcBR4GyrsxE8AuXPghfZnG_HIc6mhCxDks42SRG88-_HpRZsfzOthTQGkCSll7zx1skfbEB7rrXRfV9bgyIcLcwPMlFpWpTkSXftbD35Hl30m2zX77oSDTtIjfF_zEicBz=s800?key=3Pq5nGwOewx6dPKCSPxq8Q"
    }
  }
];





const RECORDS = [
  {
    id: "most-points",
    title: "Mais pontos em um jogo",
    value: "100 pontos",
    holder: "Wilt Chamberlain (1962)",
    note: "Recorde histórico em jogo único da NBA.",
  },
  {
    id: "most-assists",
    title: "Mais assistências em um jogo",
    value: "30 assistências",
    holder: "Scott Skiles (1990)",
    note: "Marco de criação de jogadas.",
  },
  {
    id: "most-3pm-season",
    title: "Mais cestas de 3 em uma temporada",
    value: "402",
    holder: "Stephen Curry (2015–16)",
    note: "Campanha que redefiniu o perímetro.",
  },
  {
    id: "most-wins-coach",
    title: "Técnico com mais vitórias",
    value: "1.600+",
    holder: "Gregg Popovich",
    note: "Em atividade, acumulando vitórias em temporada regular.",
  },
];

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
      {children}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs uppercase tracking-wider text-white/50">{label}</span>
      <span className="text-base font-semibold text-white/90">{value}</span>
    </div>
  );
}

function TeamCard({ team, onOpen }: { team: Team; onOpen: (t: Team) => void }) {
  return (
    <button
      onClick={() => onOpen(team)}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-4 text-left shadow-lg transition hover:scale-[1.01] hover:border-white/20"
      style={{
        boxShadow:
          "0 10px 30px -12px rgba(0,0,0,0.6), inset 0 1px 0 0 rgba(255,255,255,0.05)",
      }}
    >
      <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100" style={{
        background: `radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.15), transparent 40%)`,
      }} />
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {team.name}
          </h3>
          <p className="text-sm text-white/70">{team.city}</p>
        </div>
        <div className="flex items-center">
  {team.logo ? (
    <img
  src={team.logo}
  alt={`${team.name} logo`}
  className="h-13 w-13 object-contain transition-transform hover:scale-110 drop-shadow-[0_0_4px_rgba(255,255,255,0.25)]"
/>


  ) : (
    <div className="h-8 w-8 rounded-full border border-white/30 bg-white/10 flex items-center justify-center text-[10px] font-bold">
      {team.name.split(' ').map(w => w[0]).join('').slice(0,3)}
    </div>
  )}
</div>

      </div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <Stat label="Conferência" value={team.conference} />
        <Stat label="Títulos" value={team.championships} />
        <Stat label="Fundado" value={team.founded} />
      </div>
      <div className="mt-4 flex items-center gap-2">
  
  <div className="flex -space-x-1">
    {team.colors.map((c) => (
      <span
        key={c}
        className="h-4 w-8 rounded-full border border-white/20"
        style={{ backgroundColor: c }}
        title={c}
      />
    ))}
  </div>
</div>

    </button>
  );
}

function Drawer({ team, onClose }: { team: Team | null; onClose: () => void }) {
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [zoomAlt, setZoomAlt] = useState<string>("");

  if (!team) return null;

  const openImage = (src: string, alt: string) => {
    setZoomImage(src);
    setZoomAlt(alt);
  };

  const closeZoom = () => {
    setZoomImage(null);
    setZoomAlt("");
  };

  return (
    <>
      {/* Overlay principal */}
      <div
        aria-modal
        role="dialog"
        className="fixed inset-0 z-50 grid grid-rows-[1fr_auto] bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <div className="row-start-1 row-end-2" />
        <div
          className="mx-auto mb-0 w-full max-w-6xl rounded-t-3xl border border-white/10 bg-neutral-900/95 p-6 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Cabeçalho */}
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-white">{team.name}</h3>
              <p className="text-white/70">
                {team.city} • {team.arena} • {team.conference}
                <span className="ml-2 rounded bg-white/10 px-2 py-0.5 text-xs">
                  {team.championships} títulos
                </span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white/80 hover:bg-white/20"
            >
              Fechar
            </button>
          </div>

          {/* História */}
          <p className="mb-6 max-w-3xl text-white/80">{team.history}</p>

          {/* Imagens principais (logo, mascote, arena) */}
          <div className="grid gap-4 md:grid-cols-3">
            {team.logo && (
              <figure
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 cursor-pointer"
                onClick={() =>
                  openImage(team.logo, `${team.name} - Logo oficial`)
                }
              >
                <img
                  src={team.logo}
                  alt={`${team.name} logo`}
                  className="h-44 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <figcaption className="p-2 text-center text-xs text-white/70">
                  Logo oficial
                </figcaption>
              </figure>
            )}

            {team.images?.mascot && (
              <figure
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 cursor-pointer"
                onClick={() =>
                  openImage(team.images!.mascot!, `${team.name} - Mascote`)
                }
              >
                <img
                  src={team.images.mascot}
                  alt={`${team.name} mascot`}
                  className="h-44 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <figcaption className="p-2 text-center text-xs text-white/70">
                  Mascote
                </figcaption>
              </figure>
            )}

            {team.images?.arena && (
              <figure
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 cursor-pointer"
                onClick={() =>
                  openImage(team.images!.arena!, `${team.name} - Arena`)
                }
              >
                <img
                  src={team.images.arena}
                  alt={`${team.name} arena`}
                  className="h-44 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <figcaption className="p-2 text-center text-xs text-white/70">
                  Arena
                </figcaption>
              </figure>
            )}
          </div>

          {/* Uniformes */}
          <h4 className="mt-8 mb-2 text-white/80 font-semibold">Uniformes</h4>
          <div className="grid gap-4 md:grid-cols-3">
            {team.uniforms.home && (
              <figure
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 cursor-pointer"
                onClick={() =>
                  openImage(team.uniforms.home, `${team.name} - Uniforme Home`)
                }
              >
                <img
                  src={team.uniforms.home}
                  alt={`${team.name} home uniform`}
                  className="h-44 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <figcaption className="p-2 text-center text-xs text-white/70">
                  Home
                </figcaption>
              </figure>
            )}

            {team.uniforms.away && (
              <figure
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 cursor-pointer"
                onClick={() =>
                  openImage(team.uniforms.away, `${team.name} - Uniforme Away`)
                }
              >
                <img
                  src={team.uniforms.away}
                  alt={`${team.name} away uniform`}
                  className="h-44 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <figcaption className="p-2 text-center text-xs text-white/70">
                  Away
                </figcaption>
              </figure>
            )}

            {team.uniforms.alt && (
              <figure
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 cursor-pointer"
                onClick={() =>
                  openImage(team.uniforms.alt!, `${team.name} - Uniforme Alternativo`)
                }
              >
                <img
                  src={team.uniforms.alt}
                  alt={`${team.name} alternate uniform`}
                  className="h-44 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <figcaption className="p-2 text-center text-xs text-white/70">
                  Alternativo
                </figcaption>
              </figure>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Zoom */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeZoom}
        >
          <img
            src={zoomImage}
            alt={zoomAlt}
            className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl transition-transform duration-200"
          />
        </div>
      )}
    </>
  );
}





function Records() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {RECORDS.map((r) => (
        <div
          key={r.id}
          className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg"
        >
          <div className="mb-2 text-sm uppercase tracking-widest text-white/60">{r.title}</div>
          <div className="mb-1 text-3xl font-extrabold text-white">{r.value}</div>
          <div className="text-white/80">{r.holder}</div>
          <p className="mt-2 text-sm text-white/70">{r.note}</p>
        </div>
      ))}
    </div>
  );
}

function TeamImages({ team }: { team: any }) {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  return (
    <>
      {/* Logo, Mascote e Arena */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Logo */}
        {team.logo && (
          <figure
            className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-4 cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => setZoomedImage(team.logo)}
          >
            <div className="h-56 w-full flex items-center justify-center overflow-hidden">
              <img
                src={team.logo}
                alt={`${team.name} logo`}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-white/70">
              Logo oficial
            </figcaption>
          </figure>
        )}

        {/* Mascote */}
        {team.images?.mascot && (
          <figure
            className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-4 cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => setZoomedImage(team.images.mascot)}
          >
            <div className="h-56 w-full flex items-center justify-center overflow-hidden">
              <img
                src={team.images.mascot}
                alt={`${team.name} mascote`}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-white/70">
              Mascote
            </figcaption>
          </figure>
        )}

        {/* Arena */}
        {team.images?.arena && (
          <figure
            className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-4 cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => setZoomedImage(team.images.arena)}
          >
            <div className="h-56 w-full flex items-center justify-center overflow-hidden">
              <img
                src={team.images.arena}
                alt={`${team.name} arena`}
                className="h-full w-full object-cover rounded-md"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-white/70">
              Arena
            </figcaption>
          </figure>
        )}
      </div>

      {/* Modal de Zoom */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setZoomedImage(null)}
        >
          <button
            onClick={() => setZoomedImage(null)}
            className="absolute top-5 right-5 bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-lg text-sm"
          >
            Fechar
          </button>
          <img
            src={zoomedImage}
            alt="Zoomed"
            className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-lg"
          />
        </div>
      )}
    </>
  );
}

export default function NBAPedia() {
  const [activeTab, setActiveTab] = useState<"teams" | "records">("teams");
  const [query, setQuery] = useState("");
  const [conf, setConf] = useState<Conference>("Todas");
  const [titlesFilter, setTitlesFilter] = useState<string>("");
  const [hoverStyle, setHoverStyle] = useState({ x: 50, y: 50 });
  const [selected, setSelected] = useState<Team | null>(null);
  const [sortMode, setSortMode] = useState<SortMode>("NONE");

  const filtered = useMemo(() => {
  return TEAMS.filter((t) => {
    const matchesQuery =
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.city.toLowerCase().includes(query.toLowerCase()) ||
      t.arena.toLowerCase().includes(query.toLowerCase());

    const matchesConf = conf === "Todas" || t.conference === conf;

    let matchesTitles = true;
    if (titlesFilter !== "") {
      const n = parseInt(titlesFilter);
      if (!Number.isNaN(n)) {
        matchesTitles = n === 0 ? t.championships === 0 : t.championships === n;
      }
    }

    return matchesQuery && matchesConf && matchesTitles;
  });
}, [query, conf, titlesFilter]);

const sorted = useMemo(() => {
  const arr = [...filtered];

  switch (sortMode) {
    case "AZ":
      arr.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "ZA":
      arr.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "TITLES_DESC":
      arr.sort((a, b) => {
        const diff = b.championships - a.championships;
        return diff !== 0 ? diff : a.name.localeCompare(b.name);
      });
      break;
    case "TITLES_ASC":
      arr.sort((a, b) => {
        const diff = a.championships - b.championships;
        return diff !== 0 ? diff : a.name.localeCompare(b.name);
      });
      break;
    default:
      break;
  }

  return arr;
}, [filtered, sortMode]);





  return (
    <div
      className="min-h-screen bg-neutral-950 text-white"
      onMouseMove={(e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        setHoverStyle({ x, y });
      }}
      style={{
        backgroundImage:
          `radial-gradient(800px circle at ${hoverStyle.x}% ${hoverStyle.y}%, rgba(120,120,255,0.09), transparent 30%), radial-gradient(600px circle at 10% 20%, rgba(0,180,216,0.08), transparent 35%), radial-gradient(700px circle at 90% 10%, rgba(233,84,32,0.06), transparent 40%)`,
      }}
    >
      {/* Header */}
<header
  className="w-full top-0 left-0 z-[9999] border-b border-white/10 bg-neutral-950/80 supports-[backdrop-filter]:bg-neutral-950/60"
  style={{
    position: "fixed",
    WebkitBackdropFilter: "blur(10px)",
    backdropFilter: "blur(10px)",
    transform: "translate3d(0,0,0)",
  }}
>
  <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center">
        <Image
          src="/courtview-icon.png"
          alt="CourtView logo"
          width={36}
          height={36}
          className="object-contain"
        />
      </div>
      <div>
        <h1 className="text-xl font-extrabold tracking-tight">CourtView</h1>
        <p className="text-xs text-white/60">
          Times, histórias e recordes da NBA
        </p>
      </div>
    </div>

    <nav className="flex items-center gap-2">
      <button
        className={`rounded-xl px-3 py-2 text-sm transition ${
          activeTab === "teams"
            ? "bg-white text-neutral-900"
            : "bg-white/10 text-white/90 hover:bg-white/20"
        }`}
        onClick={() => setActiveTab("teams")}
      >
        Times
      </button>
      <button
        className={`rounded-xl px-3 py-2 text-sm transition ${
          activeTab === "records"
            ? "bg-white text-neutral-900"
            : "bg-white/10 text-white/90 hover:bg-white/20"
        }`}
        onClick={() => setActiveTab("records")}
      >
        Recordes
      </button>
    </nav>
  </div>
</header>



      {/* Hero / Controls */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 shadow-xl">
          <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">Explore a NBA</h2>
              <p className="text-sm text-white/70">Busque por cidades, arenas ou times. Filtre por conferência ou quantidade de títulos.</p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Pesquisar times, cidades ou arenas..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <select
                value={conf}
                onChange={(e) => setConf(e.target.value as Conference)}
                className="col-span-2 rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-sm text-white focus:border-white/30 focus:outline-none"
              >
                {CONFERENCES.map((c) => (
                  <option key={c} value={c} className="bg-neutral-900">{c}</option>
                ))}
              </select>
              <div className="flex items-center gap-2">
                <input
  type="number"
  min={0}
  value={titlesFilter}
  onChange={(e) => setTitlesFilter(e.target.value)}
  className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-sm text-white focus:border-white/30 focus:outline-none"
  placeholder="Títulos"
/>


              </div>
            </div>
          </div>
        </div>

        {activeTab === "teams" ? (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-white/70">Mostrando <span className="font-semibold text-white">{filtered.length}</span> de {TEAMS.length} equipes</p>
              <div className="flex items-center gap-2 text-xs text-white/60">
  <span>Ordenar:</span>

  {/* Botão A→Z */}
  <button
    className={`rounded-lg border border-white/10 px-2 py-1 hover:bg-white/10 transition ${
      sortMode === "AZ" || sortMode === "ZA" ? "bg-white/10" : ""
    }`}
    onClick={() => {
      if (sortMode === "NONE") setSortMode("AZ");
      else if (sortMode === "AZ") setSortMode("ZA");
      else if (sortMode === "ZA") setSortMode("NONE");
      else setSortMode("AZ"); // reinicia ciclo se estiver em outro
    }}
  >
    {sortMode === "ZA" ? "Z→A" : "A→Z"}
  </button>

  {/* Botão +Títulos */}
  <button
    className={`rounded-lg border border-white/10 px-2 py-1 hover:bg-white/10 transition ${
      sortMode === "TITLES_DESC" || sortMode === "TITLES_ASC"
        ? "bg-white/10"
        : ""
    }`}
    onClick={() => {
      if (sortMode === "NONE") setSortMode("TITLES_DESC");
      else if (sortMode === "TITLES_DESC") setSortMode("TITLES_ASC");
      else if (sortMode === "TITLES_ASC") setSortMode("NONE");
      else setSortMode("TITLES_DESC"); // reinicia ciclo se estiver em outro
    }}
  >
    {sortMode === "TITLES_ASC" ? "− Títulos" : "+ Títulos"}
  </button>
</div>



            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sorted.map((t) => (
                <TeamCard key={t.id} team={t} onOpen={setSelected} />
              ))}
            </div>
          </div>
        ) : (
          <Records />
        )}
      </section>

      <footer className="mx-auto max-w-7xl px-4 pb-10 pt-6 text-center text-sm text-white/50">
        GitHub: felipebborges2 
      </footer>

      <Drawer team={selected} onClose={() => setSelected(null)} />
    </div>
  );
}