
export interface CodeSnippet {
  title: string;
  description?: string;
  code: string;
  language: string;
}

export const documentationSections: CodeSnippet[] = [
  {
    title: "Declare variables",
    description: "Declare varibales and print the output",
    code: `bhai_sun x = 5;

bhai_sun naam = "Ankush";

bhai_sun jhanda = sach;
bhai_sun jhanda2 = jhuth;

bol_bhai(x)
bol_bhai(naam)
bol_bhai(jhanda)
bol_bhai(jhanda2)`,
    language: "typescript"
  },
  {
    title: "Arithmetic Operations",
    description: "Perform basic arithmetic operations",
    code: `bhai_sun x = 4;
x = x / 2;
bol_bhai(x);

x = 10;
x = x * 2;
bol_bhai(x);

x = x % 2;
bol_bhai(x);
`,
    language: "typescript"
  },
  {
    title: "Conditional Statements",
    description: "Use conditional statements",
    code: `bhai_sun x = 10;

agar(x % 2 == 1) {
  bol_bhai("Even");
} nahi_to_agar(x == 10) {
  bol_bhai("Number is 10");
} nahi_to {
  bol_bhai("Odd");
}`,
    language: "typescript"
  },
  {
    title: "While Loop",
    description: "Use while loop with 'jaha_tak' keyword",
    code: `bhai_sun i = 1;

jaha_tak(i < 10){
  bol_bhai(i * 2);
  i = i + 1;
}`,
    language: "typescript"
  },
  {
    title: "For Loop",
    description: "Use for loop with 'shuru_kar' keyword",
    code: `shuru_kar(bhai_sun i = 0; i < 10; i = i + 1) {
  bol_bhai(i);
}

chal_bhai(bhai_sun i = 10; i > 0; i = i - 1) {
  bol_bhai(i);
}`,
    language: "typescript"
  },
  {
    title: "Break and Continue",
    description: "Use break and continue statements",
    code: `chal_bhai(bhai_sun i = 0; i < 10; i = i + 1) {
      agar(i == 5) {
        aage_bhad_bhai;
        } nahi_to_agar(i == 7) {
          bas_kar_bhai;
          }
          bol_bhai(i);
          }`,
    language: "typescript"
  },
  {
    title: "Arrays",
    description: "Declare arrays and track through indexes",
    code: `bhai_sun arr = [1, 2, 3, 4, 5];
      
      bol_bhai(arr);
      bol_bhai(arr[1]);
      
      shuru_kar(bhai_sun i = 0; i < 5; i = i + 1) {
        bol_bhai(arr[i]);
      }`,
    language: "typescript"
  },
];