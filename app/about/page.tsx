import Profile from "@/components/profile";

export default function About() {
  return (
    <div className="items-center flex flex-col mx-auto p-8 w-[900px]">
      <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        About us
      </h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
        egestas libero id neque tincidunt, et convallis augue varius. Aenean
        dapibus nec elit et finibus. In eget dapibus erat. Suspendisse ac
        dignissim lectus. Fusce efficitur blandit ipsum. Aenean ut vestibulum
        elit, ut hendrerit enim. Phasellus malesuada risus non arcu aliquet,
        quis finibus risus ornare. Vivamus laoreet sollicitudin mauris, quis
        feugiat sem rhoncus et. Etiam vel sagittis neque. Morbi erat enim,
        volutpat eget metus eget, placerat gravida risus. Maecenas elementum
        consequat elit, id convallis eros dapibus in. Maecenas ac consectetur
        nisl, sit amet bibendum odio. Nam eget quam condimentum mi lacinia
        rutrum nec ut neque. Nunc rutrum, sapien sit amet blandit ultrices,
        ligula nunc facilisis urna, quis luctus nibh odio sit amet dolor.
        Phasellus vel dolor quis massa rhoncus faucibus in a nunc. Integer nec
        erat a purus viverra rutrum quis eget nunc. Quisque pulvinar mattis
        risus, bibendum faucibus tellus ornare quis. Vestibulum nec justo
        dictum, lacinia nulla ut, tristique mauris. Curabitur et pharetra nunc.
        Nunc erat turpis, pretium porta rhoncus elementum, mattis sed dui.
        Praesent faucibus at elit vel varius.
      </p>
      <div className="flex justify-between w-[700px] mt-20">
        <Profile url="test" name="Peeranat Kongkipipat" course="BCG/2" />
        <Profile url="test" name="Plengpin Tongdon-ngao" course="CE/1" />
        <Profile url="test" name="Kulpatch Chananum" course="CSEC/2" />
        <Profile url="test" name="Nathan Juirnarongrit" course="BCE/2" />
      </div>
    </div>
  );
}
