// src/core/hook/useHoleCoverLogic.js

import { useCylinder } from "@react-three/cannon";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import useGameStore from "../state/useGameStore";
import { computeHolePosition } from "../utils/positionUtils";

const themeMessages = {
  tema1: [
    "Aku bangga dengan diri sendiri, walaupun belum sempurna. Apakah aku seperti itu? Akan aku ceritakan!",
    "Aku merasa diriku mempunyai banyak hal baik yang bisa ku kembangkan, contohnya…",
    "Apakah aku suka menjadi diri sendiri atau menjadi seperti orang lain? Sampaikan!",
    "Aku tahu aku punya kekurangan, tapi itu tidak membuatku minder, nih aku kasih tahu caranya…",
    "Aku berusaha memperbaiki diriku, tapi tetap sayang sama diri sendiri, nih aku kasih tahu cara yang aku lakukan!",
    "Aku tidak malu melakukan kesalahan, karena dari situ aku belajar, dan ini lah pengalamanku…",
    "Aku tidak menyalahkan diriku atas kejadian di masa lalu, ini caraku untuk menerimanya…",
    "Dulu aku sempat gagal, tapi sekarang aku bisa menghargai proses itu. Aku ceritakan alasannya!",
    "Bacalah dan maknai quotes ini untuk mu “Hidup itu bukan tentang jadi sempurna, tetapi tentang menerima dan belajar dari setiap langkah, baik itu kemenangan atau kegagalan.”",
    "Bacalah dan maknai quotes ini untuk mu “Setiap bagian dari diriku, baik yang kuat maupun yang perlu diperbaiki, adalah bagian dari perjalanan yang membentuk siapa aku sekarang.”",
  ],
  tema2: [
    "Aku merasa aman bersama teman-teman yang…",
    "Aku akan kasih tahu siapa yang bisa aku percaya buat dengerin aku…",
    "Aku punya orang yang selalu ada dan bisa berkeluh kesah, nih aku kasih tahu…",
    "Aku suka menolong teman yang sedang kesusahan, walaupun itu hal kecil, nih contohnya…",
    "Jika temanku murung, aku kepikiran dan pengen bantu agar dia semangat lagi, dengan cara…",
    "Jika temanku sedih, aku suka membuat temanku merasa dihargai dan disayang, dengan cara…",
    "Aku percaya hubungan yang baik itu saling membantu, bukan hanya salah satu saja yang berusaha, dan ini lah kisahku…",
    "Aku senang kalau bisa berbagi, dan aku juga belajar untuk menerima bantuan orang lain dengan senang hati, ini lah kisahku…",
    "Bacalah dan maknai quotes ini untuk mu “Teman sejati itu bukan yang selalu ada saat senang, tetapi tetap tinggal, mendengar, dan peduli saat kita butuh tempat bersandar.”",
    "Bacalah dan maknai quotes ini untuk mu “Hubungan yang kuat itu tumbuh dari hati yang mau memberi, telinga yang mau mendengar, dan tangan yang mau saling membantu.”",
  ],
  tema3: [
    "Aku bisa memunculkan ide yang bermanfaat untuk…",
    "Supaya kelas tidak berantakan aku akan membuatnya menjadi lebih rapi, karena aku suka membantu, dan inilah caraku…",
    "Jika aku harus menyelesaikan tugas dalam sehari, supaya semuanya bisa dikerjakan dengan baik yang akan aku lakukan adalah…",
    "Aku lebih suka menghindari permasalahan dari pada menyelesaikannya, karena…",
    "Dalam lomba atau kegiatan baru, di dalamnya ada kesempatan….yang kuperoleh! Dan membuatku ingin mencoba hal-hal baru!",
    "Aku akan menceritakan kegiatanku hari ini dari bangun tidur sampai tidur lagi!",
    "Ada banyak ekstrakulikuler di sekolah dan aku bisa memilih yang paling sesuai dengan apa yang aku suka dan aku butuhkan, dan ini lah caraku…",
    "Aku merasa harus memilih antara dua pilihan yang lebih sesuai dan aku anggap penting, akan aku ceritakan bagaimana aku memutuskan sesuatu…",
    "Bacalah dan maknai quotes ini untuk mu  “Hidup adalah pilihanku. Aku bisa mengatur diriku, membuat perubahan di sekitarku, dan memilih yang terbaik untuk diriku”",
    "Bacalah dan maknai quotes ini untuk mu  “Setiap kesempatan adalah peluang untuk berkembang. Aku berani memilih apa yang terbaik untuk diriku”",
  ],
  tema4: [
    "Aku pernah merasa berhasil menentukan pilihan sendiri, akan aku ceritakan perasaan ku saat itu!",
    "Aku adalah orang yang mandiri, ini lah contohnya…",
    "Aku percaya jika ada orang yang berkata bahwa banyak kekuranganku, karena…",
    "Aku tetap ingin menjadi diri sendiri, aku beri tahu alasannya!",
    "Apakah aku bangga dengan diri sendiri dan kenapa?",
    "Apakah aku perlu mencintai diri sendiri dan kenapa?",
    "Akan aku sebutkan lima (5) keunikan atau kelebihan yang aku miliki!",
    "1-100% seberapa aku mencintai diriku, dan ini lah alasanku…",
    "Bacalah dan maknai quotes ini untuk mu “Tidak harus sama seperti orang lain. Cukup jadi diriku sendiri, dan itu sudah keren.”",
    "Bacalah dan maknai quotes ini untuk mu  “Setiap hari aku jadi lebih baik, karena aku tahu, cinta diri itu kunci untuk berkembang”",
  ],
  tema5: [
    "Jika hidupku adalah buku, ada bab yang paling seru dan menunjukkan perkembangan ku. Akan aku ceritakan yang terjadi di bab itu!",
    "Aku membayangkan diriku satu tahun dari sekarang. Dan aku melihat dalam diriku yang berbeda menjadi lebih baik, inilah perubahanku…",
    "Jika aku bisa memberi nama untuk prosesku bertumbuh kembang, aku akan menamainya dengan… karena…",
    "Aku sadar jika aku semakin banyak belajar dari pengalaman, nih contohnya…",
    "Aku pernah merasa seperti ini, “Wow, aku bisa banget nih!” saat melakukan sesuatu, akan aku ceritakan momen itu…",
    "Aku tahu aku punya kelebihan yang bisa aku kembangkan, contohnya…",
    "Jika aku punya kaca ajaib yang bisa menunjukkan betapa berkembangnya diriku selama setahun terakhir, yang aku lihat didalam nya adalah…",
    "Dalam perjalanan hidupku, aku merasa semakin berkembang dalam hal… karena…",
    "Satu hal dalam diriku yang ingin tetap aku miliki sampai aku dewasa nanti adalah…",
    "Bacalah dan maknai quotes ini untuk mu  “Aku tidak harus langsung jago, yang penting aku terus maju. Pelan-pelan, tapi pasti aku upgrade diri!”",
  ],
  tema6: [
    "Aku punya hal-hal yang ingin aku capai di masa depan, dan aku semangat untuk menjalaninya. Ini dia capaian dan harapanku…",
    "Aku sudah berpikir mau jadi apa nanti, jadi langkahku sekarang lebih terarah, nih aku kasih tahu langkahku!",
    "Hal-hal yang pernah aku alami baik atau buruk, membuat aku jadi lebih kuat dan belajar banyak, salah satunya adalah…",
    "Aku merasa hidupku sekarang punya arti, walaupun masih banyak hal yang mau aku pahami, seperti…",
    "Aku ingin menjadi orang bermanfaat, dan aku sudah melakukan hal-hal sebagai berikut…",
    "Moto hidup membuat aku semangat untuk jadi versi terbaik dari diriku sendiri, dan ini lah moto hidupku…",
    "Aku punya impian yang jelas dan aku mulai pelan-pelan untuk mewujudkannya, ini dia mimpi dan langkahku…",
    "Aku suka membuat rencana kecil agar bisa lebih dekat dengan cita-citaku, ini cara versi ku…",
    "Bacalah dan maknai quotes ini untuk mu “Hidup itu seperti naik sepeda, harus terus gowes supaya tetap seimbang, dan tahu ke mana tujuannya biar nggak muter-muter aja”",
    "Bacalah dan maknai quotes ini untuk mu  “Setiap langkah kecil hari ini, bisa jadi bagian dari cerita besar yang berarti buat masa depan. Asal yakin dan terus jalan”",
  ],
};

export function useHoleCoverLogic(index, radius, angle, floorRef) {
  const coverRef = useRef();
  const isClosed = useGameStore((s) => s.closedHoles[index]);
  const closeHole = useGameStore((s) => s.closeHole);
  const removeBallByBodyId = useGameStore((s) => s.removeBallByBodyId);
  // Ganti parameter selectedTheme dengan mengambilnya langsung dari store
  const selectedTheme = useGameStore((state) => state.selectedTheme);

  // Gunakan useRef agar isClosed tetap konsisten di dalam handleBallCollision
  const isClosedRef = useRef(isClosed);

  useEffect(() => {
    isClosedRef.current = isClosed;
  }, [isClosed]);

  const [physicsRef, physicsApi] = useCylinder(() => ({
    args: [0.5, 0.5, 0.35, 32],
    position: [0, -2, 0],
    type: "Kinematic",
    material: "floorMaterial",
    onCollide: handleBallCollision,
    userData: { type: "holeCover", index },
  }));

  function handleBallCollision(e) {
    const body = e.body;
    if (body?.userData?.type === "ball") {
      // Jika HoleCover sedang menutup lubang, bola tidak dihapus
      if (isClosedRef.current) return;

      const id = body.id;
      removeBallByBodyId(id);
      if (body.remove) body.remove();

      // Setelah bola masuk, tutup lubang
      closeHole(index);

      const holeMessages =
        themeMessages[selectedTheme] || themeMessages["Action"];
      const message = holeMessages[index] || "Bola masuk lubang!";
      useGameStore.getState().setHolePopup(true, message);
    }
  }

  useFrame(() => {
    if (!coverRef.current || !floorRef.current) return;

    const rotationY = floorRef.current.rotation.y;
    const { x, z } = computeHolePosition(angle, radius, rotationY);
    const y = isClosed ? -1.7 : -2.15;

    coverRef.current.position.set(x, y, z);
    physicsApi.position.set(x, y, z);
  });

  return {
    coverRef,
    physicsRef,
    isClosed,
  };
}
