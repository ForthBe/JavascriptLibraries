//#region 
import { forEach } from './LinqJsFunctions.js';

class Assert {

    static Equals(expected, actual) {
        if (expected == actual)
            return;

        throw 'expected ' + expected + ' found ' + actual;
    }

    static NotEquals(expected, actual) {
        if (expected != actual)
            return;

        throw 'expected different from' + expected + ' found ' + actual;
    }
}

//#endregion

//#region Collections

class CollectionAssert {
    static AreEquals(expected, actual) {
        if (!expected || !actual)
            Assert.Equals(expected, actual);
        else {
            Assert.Equals(expected.length, actual.length);
            forEach(expected, (x, i) => Assert.Equals(x, actual[i]));
        }
    }

    static AreNotEquals(expected, actual) {
        if (!expected || !actual)
            Assert.NotEquals(expected, actual);
        else {
            forEach(expected, (x, i) => Assert.AreNotEquals(x, actual[i]));
        }
    }
}

//#endregion

//#region Helpers

class UnitTestsHelper
{
    static Method()
    {
        
    }
}

//#endregion