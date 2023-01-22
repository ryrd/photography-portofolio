export interface dataType {
    photo: string;
    dimension: {
        width: number;
        height: number;
    };
    position: {
        x: number;
        y: number;
        z: number;
    };
}[]

const data: dataType[] = [
    {
        photo: '/photos/img-5.webp',
        dimension: {
            width: .1,
            height: .15,
        },
        position: {
            x: .6,
            y: 0.5,
            z: -2
        }
    },
    {
        photo: '/photos/img-1.webp',
        dimension: {
            width: .1,
            height: .15,
        },
        position: {
            x: -0.633,
            y: 0.3,
            z: -0.877
        }
    },
    {
        photo: '/photos/img-8.webp',
        dimension: {
            width: .15,
            height: .1,
        },
        position: {
            x: 0.57,
            y: -0.18,
            z: -0.574
        }
    },
    {
        photo: '/photos/img-10.webp',
        dimension: {
            width: .1,
            height: .13,
        },
        position: {
            x: 1.2,
            y: .2,
            z: .75
        }
    },
    {
        photo: 'https://source.unsplash.com/qStCjo_Ve8s',
        dimension: {
            width: .21,
            height: .1,
        },
        position: {
            x: -.7,
            y: -.1,
            z: .8
        }
    },
    {
        photo: 'https://source.unsplash.com/UY3Un7Apd7g',
        dimension: {
            width: .25,
            height: .1,
        },
        position: {
            x: 0.57,
            y: 0.3,
            z: 1
        }
    },
    {
        photo: 'https://source.unsplash.com/Z13HfI7Bd6s',
        dimension: {
            width: .23,
            height: .1,
        },
        position: {
            x: -1,
            y: 0.3,
            z: 1.5
        }
    },
    {
        photo: 'https://source.unsplash.com/FzhS_Qhf3y4',
        dimension: {
            width: .23,
            height: .1,
        },
        position: {
            x: 0.57,
            y: 0.9,
            z: 1.8
        }
    },
    {
        photo: 'https://source.unsplash.com/rbCyuDEOZfg',
        dimension: {
            width: .15,
            height: .1,
        },
        position: {
            x: 1.3,
            y: -0.1,
            z: 1.65
        }
    },
]
export default data