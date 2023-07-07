const { default: expect } = require("expect")
const matrix_module = require("../dist/matrix/Matrix")
const Matrix = matrix_module.Matrix
const vector_module = require("../dist/vector/Vector")
const Vector = vector_module.Vector

let rowMatrix, columnMatrix, arrayRowMatrix, arrayColumnMatrix, squareRowMatrix, squareRowArray, squareColumnMatrix, squareColumnArray

describe('Matrix', () => {


    beforeEach(() => {
        rowMatrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
        columnMatrix = new Matrix([[[1], [2], [3]], [[4], [5], [6]]]);

        arrayRowMatrix = [[1, 2, 3], [4, 5, 6]]
        arrayColumnMatrix = [[[1], [2], [3]], [[4], [5], [6]]]

        squareRowMatrix = new Matrix([[1, 2], [3, 4]])
        squareRowArray = [[1, 2], [3, 4]]

        squareColumnMatrix = new Matrix([[[1], [2]], [[3], [4]]])
        squareColumnArray = [[[1], [2]], [[3], [4]]]


    });

    describe('Matrix initialization', () => {

        it('Validation of a row matrix', () => {
            expect(rowMatrix.isRowMatrix).toBeTruthy();
            expect(rowMatrix.size).toBe(6);
            expect(rowMatrix.shape).toBe('(2,3)');
            expect(rowMatrix.isWide).toBeTruthy()
        });

        it('Validation of a column matrix', () => {
            expect(columnMatrix.isColumnMatrix).toBeTruthy();
            expect(columnMatrix.size).toBe(6);
            expect(columnMatrix.shape).toBe('(3,2)');
            expect(columnMatrix.isTall).toBeTruthy()
        });

        it('Validation of a square row matrix', () => {
            expect(squareRowMatrix.isRowMatrix).toBeTruthy();
            expect(squareRowMatrix.size).toBe(4);
            expect(squareRowMatrix.shape).toBe('(2,2)');
            expect(squareRowMatrix.isSquare).toBeTruthy()
        });

        it('Validation of a square column matrix', () => {
            expect(squareColumnMatrix.isColumnMatrix).toBeTruthy();
            expect(squareColumnMatrix.size).toBe(4);
            expect(squareColumnMatrix.shape).toBe('(2,2)');
            expect(squareColumnMatrix.isSquare).toBeTruthy()
        });


        it('Error: Different types of entries', () => {
            expect(() => new Matrix([[2], 2])).toThrow();
        })
    });


    describe('Matrix addition', () => {
        it('Matrix addition with two 3x3 row matrixes ', () => {
            expect(rowMatrix.add(rowMatrix).mElements).toEqual([
                new Vector([2, 4, 6]),
                new Vector([8, 10, 12])
            ])
        });

        it('Matrix addition with two 3x3 column matrixes ', () => {
            expect(columnMatrix.add(columnMatrix).mElements).toEqual([
                new Vector([[2], [4], [6]]),
                new Vector([[8], [10], [12]])
            ])
        });

        it('Matrix addition with two 3x3 column matrixes ', () => {
            const testings = new Matrix([new Vector([[1], [4]]),
            new Vector([[2], [5]]),
            new Vector([[3], [6]])])

            expect(rowMatrix.add(testings).mElements).toEqual([
                new Vector([2, 4, 6]),
                new Vector([8, 10, 12])
            ])
        });

        it('Error: Different dimentions', () => {
            expect(() => rowMatrix.add(columnMatrix)).toThrow()
        });
    });

    describe('Matrix subtraction', () => {
        it('Matrix subtraction with two 3x3 row matrixes ', () => {
            expect(rowMatrix.subtract(rowMatrix).mElements).toEqual([
                new Vector([0, 0, 0]),
                new Vector([0, 0, 0])
            ])
        });

        it('Matrix addition with two 3x3 column matrixes ', () => {
            expect(columnMatrix.subtract(columnMatrix).mElements).toEqual([
                new Vector([[0], [0], [0]]),
                new Vector([[0], [0], [0]])
            ])
        });

        it('Matrix addition with two 3x3 column matrixes ', () => {
            const testings = new Matrix([new Vector([[1], [4]]),
            new Vector([[2], [5]]),
            new Vector([[3], [6]])])

            expect(rowMatrix.subtract(testings).mElements).toEqual([
                new Vector([0, 0, 0]),
                new Vector([0, 0, 0])
            ])
        });

        it('Error: Different dimentions', () => {
            expect(() => rowMatrix.subtract(columnMatrix)).toThrow()
        });
    });


    describe('Matrix identity', () => {
        it('A 3x3 identity row matrix', () => {
            const matrix = Matrix.createIdentityMatrix(3);

            expect(matrix.rows).toBe(3);
            expect(matrix.columns).toBe(3);

            matrix.mElements.forEach((unitVector, index) => {
                expect(unitVector.isUnitVector()).toBe(true);


                const indexOfOne = unitVector.vElements.findIndex(element => element === 1);
                expect(indexOfOne).toBe(index);
            });
        });

        it('A 3x3 identity column matrix', () => {
            const matrix = Matrix.createIdentityMatrix(3, true);

            expect(matrix.rows).toBe(3);
            expect(matrix.columns).toBe(3);
            matrix.mElements.forEach((unitVector, index) => {
                expect(unitVector.isUnitVector()).toBe(true);
                const indices = unitVector.vElements.map((subarray) => subarray.findIndex((element) => element === 1));
                expect(indices.findIndex((e) => e === 0)).toBe(index);
            });
        });


        it('Error: Non-positive dimensions', () => {
            expect(() => Matrix.createIdentityMatrix(-1)).toThrow();
            expect(() => Matrix.createIdentityMatrix(0)).toThrow();
            expect(() => Matrix.createIdentityMatrix(-1)).toThrow();
            expect(() => Matrix.createIdentityMatrix(0)).toThrow();
        });

        it('Error: Non-boolean third argument', () => {
            expect(() => Matrix.createIdentityMatrix(3, 3, 'true')).toThrow();
            expect(() => Matrix.createIdentityMatrix(3, 3, null)).toThrow();
            expect(() => Matrix.createIdentityMatrix(3, 3, {})).toThrow();
        });


    });

    describe('Matrix to column matrix', () => {
        it('Convert a row matrix to a column matrix', () => {
            const columnMatrix = rowMatrix.toColumnMatrix();

            expect(columnMatrix.mElements).toEqual([
                new Vector([[1], [4]]),
                new Vector([[2], [5]]),
                new Vector([[3], [6]])
            ]);
        });

        it("Error: Column matrix as argument", () => {
            expect(() => columnMatrix.toColumnMatrix()).toThrow()
        })
    });

    describe('Matrix to row matrix', () => {
        it('Convert a column matrix to a row matrix', () => {
            const rowMatrix = columnMatrix.toRowMatrix();

            expect(rowMatrix.mElements).toEqual([
                new Vector([1, 4]),
                new Vector([2, 5]),
                new Vector([3, 6])
            ]);
        });

        it("Error: Column matrix as argument", () => {
            expect(() => rowMatrix.toRowMatrix()).toThrow()
        })

    });


    describe('Matrix transpose', () => {
        it('Transpose a row matrix', () => {
            const columnMatrix = rowMatrix.transpose();

            expect(columnMatrix.mElements).toEqual([
                new Vector([[1], [2], [3]]),
                new Vector([[4], [5], [6]]),
            ]);
        });

        it('Transpose a column matrix ', () => {
            const rowMatrix = columnMatrix.transpose();

            expect(rowMatrix.mElements).toEqual([
                new Vector([1, 2, 3]),
                new Vector([4, 5, 6])
            ]);
        });


    });

    describe('Matrix naive multiplication', () => {
        it('A row matrix with a column matrix', () => {
            expect(rowMatrix.naiveMultiply(columnMatrix).mElements).toEqual([
                new Vector([14, 32]),
                new Vector([32, 77])
            ])
        });

        it('A column matrix with a row matrix', () => {
            expect(rowMatrix.naiveMultiply(columnMatrix).mElements).toEqual([
                new Vector([14, 32]),
                new Vector([32, 77])
            ])
        });

        it('Error: Amount of columns does not match the amount of rows on the second', () => {
            expect(() => columnMatrix.naiveMultiply(columnMatrix)).toThrow()
        });


    });


    describe('Strassen\'s matrix multiplication', () => {
        it('A row matrix with a column matrix', () => {
            expect(rowMatrix.strassenMultiply(columnMatrix).mElements).toEqual([
                new Vector([14, 32]),
                new Vector([32, 77])
            ])
        });

        it('A column matrix with a row matrix', () => {
            expect(rowMatrix.strassenMultiply(columnMatrix).mElements).toEqual([
                new Vector([14, 32]),
                new Vector([32, 77])
            ])
        });

    });


    describe('Get submatrix', () => {
        it('Get submatrix in a 2x3 row matrix', () => {
            expect(rowMatrix.getSubMatrix(0, 2, 1, 3).mElements).toEqual([
                new Vector([2, 3]),
                new Vector([5, 6])
            ])
        });

        it('Get submatrix in a 3x2 column matrix', () => {

            expect(columnMatrix.getSubMatrix(1, 3, 0, 2).mElements).toEqual([
                new Vector([[2], [3]]),
                new Vector([[5], [6]])
            ])
        });


    });

    describe('Set submatrix', () => {
        const rowSubmatrix = new Matrix([[1, 1], [1, 1]])
        const columnSubmatrix = new Matrix([[[1], [1]], [[1], [1]]])

        it('Set submatrix in a 2x3 row matrix', () => {
            rowMatrix.setSubMatrix(rowSubmatrix, 0, 2, 1, 3)
            expect(rowMatrix.mElements).toEqual([
                new Vector([1, 1, 1]),
                new Vector([4, 1, 1])
            ])
        });

        it('Set submatrix in a 3x2 column matrix', () => {
            columnMatrix.setSubMatrix(columnSubmatrix, 0, 2, 0, 2)
            expect(columnMatrix.mElements).toEqual([
                new Vector([[1], [1], [3]]),
                new Vector([[1], [1], [6]])
            ])
        });

    });

    describe('Pad matrix to power of two', () => {

        it('Pading of a 2x3 row matrix', () => {
            expect(rowMatrix.padMatrixToPowerOfTwo().mElements).toEqual([
                new Vector([1, 2, 3, 0]),
                new Vector([4, 5, 6, 0]),
                new Vector([0, 0, 0, 0]),
                new Vector([0, 0, 0, 0])
            ])
        });

        it('Pading of a 3x2 row matrix', () => {
            expect(columnMatrix.padMatrixToPowerOfTwo().mElements).toEqual([
                new Vector([1, 4, 0, 0]),
                new Vector([2, 5, 0, 0]),
                new Vector([3, 6, 0, 0]),
                new Vector([0, 0, 0, 0])
            ])
        });

        it('Pading of a square matrix', () => {
            const unit = Matrix.createIdentityMatrix(2)
            expect(unit.padMatrixToPowerOfTwo()).toEqual(unit)
        });


    });


    describe('Is upper triangular', () => {
        it('Upper triangular check with row matrix', () => {
            const solTest = new Matrix([new Vector([1, 0, 0]), new Vector([0, 1, 1]), new Vector([0, 0, 1])])
            expect(solTest.isUpperTriangular()).toBeTruthy()
        });
        it('Upper triangular check with column matrix', () => {
            const solTest = new Matrix([new Vector([[1], [0], [0]]), new Vector([[1], [1], [0]]), new Vector([[0], [0], [1]])])
            expect(solTest.isUpperTriangular()).toBeTruthy()
        });
        it('Upper triangular check with column matrix', () => {
            const solTest = new Matrix([new Vector([[1], [1], [0]]), new Vector([[1], [1], [1]]), new Vector([[0], [0], [1]])])
            expect(solTest.isUpperTriangular()).toBeFalsy()
        });
    });

    describe('Is lower triangular', () => {
        it('Lower triangular check with row matrix', () => {
            const solTest = new Matrix([new Vector([1, 0, 0]), new Vector([1, 1, 0]), new Vector([1, 1, 1])])
            expect(solTest.isLowerTriangular()).toBeTruthy()
        });
        it('Lower triangular check with column matrix', () => {
            const solTest = new Matrix([new Vector([[1], [1], [1]]), new Vector([[0], [1], [1]]), new Vector([[0], [0], [1]])])
            expect(solTest.isLowerTriangular()).toBeTruthy()
        });
        it('Lower triangular check with non-triangular column matrix', () => {
            const solTest = new Matrix([new Vector([[1], [1], [0]]), new Vector([[1], [1], [1]]), new Vector([[0], [0], [1]])])
            expect(solTest.isLowerTriangular()).toBeFalsy()
        });
    });


    describe('Back substitution', () => {
        it('An upper triangular row matrix with the solution [4,-11,13]  ', () => {
            const solTest = new Matrix([new Vector([1, 0, 0]), new Vector([0, 1, 1]), new Vector([0, 0, 1])])
            expect(solTest.backSubstitution(new Vector([4, 2, 13]))).toEqual(
                new Vector([4, -11, 13]),
            )
        });

        it('An upper triangular row matrix with the solution [52, -37, 13]  ', () => {
            const solTest = new Matrix([new Vector([1, 2, 2]), new Vector([0, 1, 3]), new Vector([0, 0, 1])])
            expect(solTest.backSubstitution(new Vector([4, 2, 13]))).toEqual(
                new Vector([52, -37, 13]),
            )
        });

        it('An upper triangular column matrix with the solution [4,-11,13]  ', () => {
            const solTest = new Matrix([new Vector([[1], [0], [0]]), new Vector([[2], [1], [0]]), new Vector([[2], [3], [1]])])

            expect(solTest.backSubstitution(new Vector([4, 2, 13]))).toEqual(
                new Vector([52, -37, 13]),
            )
        });

        it('Error: 0 in main diagonal', () => {
            const solTest = new Matrix([new Vector([1, 2, 2]), new Vector([0, 0, 3]), new Vector([0, 0, 1])])
            expect(() => solTest.backSubstitution(new Vector([4, 2, 13]))).toThrow()
        });
    });

    describe('QR decomposition', () => {
        it('QR decomposition with a 2x2 row matrix [[1,1],[0,1]]', () => {
            const testMatrix = new Matrix([new Vector([1, 1]), new Vector([0, 1])])
            const { Q, R } = testMatrix.QRDecomposition()


            expect(Q.mElements).toEqual([
                new Vector([1, 0]),
                new Vector([0, 1])
            ])
            expect(R.mElements).toEqual([
                new Vector([1, 1]),
                new Vector([0, 1])
            ])
        });

        it('QR decomposition with a 4x4 row matrix [[0,0,1,0],[1,0,0,0],[0,1,1,0],[0,0,0,1]]', () => {
            const testMatrix = new Matrix([new Vector([0, 0, 1, 0]), new Vector([1, 0, 0, 0]), new Vector([0, 1, 1, 0]), new Vector([0, 0, 0, 1])])
            const { Q, R } = testMatrix.QRDecomposition()


            expect(Q.mElements).toEqual([
                new Vector([0, 0, 1, 0]),
                new Vector([1, 0, 0, 0]),
                new Vector([0, 1, 0, 0]),
                new Vector([0, 0, 0, 1])])
            expect(R.mElements).toEqual([
                new Vector([1, 0, 0, 0]),
                new Vector([0, 1, 1, 0]),
                new Vector([0, 0, 1, 0]),
                new Vector([0, 0, 0, 1])])
        });

        it('QR decomposition with a 4x3 row matrix [[0,0,1],[1,0,0],[0,1,1],[0,0,0]]', () => {
            const testMatrix = new Matrix([new Vector([0, 0, 1]), new Vector([1, 0, 0]), new Vector([0, 1, 1]), new Vector([0, 0, 0])])
            const { Q, R } = testMatrix.QRDecomposition()

            expect(Q.mElements).toEqual([
                new Vector([0, 0, 1]),
                new Vector([1, 0, 0]),
                new Vector([0, 1, 0]),
                new Vector([0, 0, 0])])

            expect(R.mElements).toEqual([
                new Vector([1, 0, 0]),
                new Vector([0, 1, 1]),
                new Vector([0, 0, 1])])
        });


        it('QR decomposition 4x3 column matrix [[[0], [1], [0], [0]], [[0], [0], [1], [0]],[[1], [0], [1], [0]]]', () => {
            const testMatrix = new Matrix([new Vector([[0], [1], [0], [0]]), new Vector([[0], [0], [1], [0]]), new Vector([[1], [0], [1], [0]])])
            const { Q, R } = testMatrix.QRDecomposition()


            expect(Q.mElements).toEqual([
                new Vector([0, 0, 1]),
                new Vector([1, 0, 0]),
                new Vector([0, 1, 0]),
                new Vector([0, 0, 0])])

            expect(R.mElements).toEqual([
                new Vector([1, 0, 0]),
                new Vector([0, 1, 1]),
                new Vector([0, 0, 1])])
        });


    });


})