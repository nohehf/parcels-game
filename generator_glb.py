import bpy
import itertools
import os

listComponents = ["B. House", "B. Ferme", "B. Chateau", "C. Murailles", "C. Douves", "R. Mine", "R. Puit", "Moulin", "Tour carré", "D. Tente", "Chariot", "Animaux", "Details"]

def binseq(k):
    return [''.join(x) for x in itertools.product('01', repeat=k)]

output_dir = ""

def bitsToParcelle(bitTuple):
    buildingBits = bitTuple[0]
    defenseBits = bitTuple[1]
    contourBits = bitTuple[2]
    ressourcesBits = bitTuple[3]
    animauxBits = bitTuple[4]
    detailsBits = bitTuple[5]
    
    toDelete = False
    
    if contourBits == "000":
        contour = []
    elif contourBits == "001":
        contour = ["C. Douves"]
    elif contourBits == "100":
        contour = ["C. Murailles"]
    elif contourBits == "101":
        contour = ["C. Murailles", "C. Douves"] 
    else:
        contour = ["permutationToDelete"]
        toDelete = True
        
    if ressourcesBits == "000":
        ressources = []
    elif ressourcesBits == "001":
        ressources = ["R. Mine"]
    elif ressourcesBits == "010":
        ressources = ["R. Puit"]
    elif ressourcesBits == "100":
        ressources = ["Moulin"]
    elif ressourcesBits == "011":
        ressources = ["R. Mine", "R. Puit"]
    elif ressourcesBits == "101":
        ressources = ["Moulin", "R. Mine"]
    elif ressourcesBits == "110":
        ressources = ["R. Puit", "Moulin"]
    else:
        ressources = ["R. Mine", "R. Puit", "Moulin"]

    if buildingBits == "00":
        building = ["B. Ferme"]
    elif buildingBits == "01":
        building = ["B. House"]
    elif buildingBits == "10":
        building = ["B. Chateau"]
    else:
        building = ["permutationToDelete"]
        toDelete = True
    
    if defenseBits == "000":
        defense = []
    elif defenseBits == "001":
        defense = ["Tour carré"]
    elif defenseBits == "010":
        defense = ["Chariot"]
    elif defenseBits == "100":
        defense = ["D. Tente"]
        
    elif defenseBits == "011":
        defense = ["Tour carré", "Chariot"]
    elif defenseBits == "101":
        defense = ["D. Tente", "Tour carré"]
    elif defenseBits == "110":
        defense = ["D. Tente", "Chariot"]
        
    elif defenseBits == "111":
        defense = ["D. Tente", "Tour carré", "Chariot"]
    else:
        defense = ["permutationToDelete"]
        toDelete = True
        
    if animauxBits == "0":
        animaux = []
    else:
        animaux = ["Poules", "Chat", "Doge"]
        
    if detailsBits == "0":
        details = []
    else:
        details = ["Banc", "Etang"]
    
    sol = ["Floor"]

    parcelle = {
        "Building": building,
        "Defense": defense,
        "Ressources": ressources,
        "Contour": contour,
        "Sol": sol,
        "Animaux": animaux,
        "Details": details,
    }
    
    signature = dictToSignature(parcelle, toDelete)
    
    parcelle["bitSignature"] = signature
    
    if ["permutationToDelete"] in parcelle.values():
        return None
    return parcelle


def generateParcelleDict():
    bitsBuildings = binseq(2)
    bitsDefense = binseq(3)
    bitsRessources = binseq(3)
    bitsContour = binseq(3)
    bitsSol = binseq(1)
    bitsAnimaux = binseq(1)
    bitsDetails = binseq(1)

    a = list(itertools.product(bitsBuildings, bitsDefense, bitsContour, bitsRessources, bitsAnimaux, bitsDetails))
    counter = 0
    counterValid = 0
    counterInvalid = 0
    for elt in a:
        counter += 1
        parcelle = bitsToParcelle(elt)
        if parcelle != None:
            counterValid += 1
            generateParcelle(parcelle)
        else:
            counterInvalid += 1
    print(counter)
    print("valid : ", counterValid)
    print("invalid : ", counterInvalid)


def selectCollection(name):
    for obj in bpy.data.collections[name].all_objects:
        obj.select_set(True)
        
def deselectCollection(name):
    for obj in bpy.data.collections[name].all_objects:
        obj.select_set(False)

    
def generateParcelle(parcelleDict):
    
    ## Render all elements to prevent error with view Layer
    resetCollectionRender()
    
    ## Deselect all collections
    deselectAllCollections()
    
    ## Select all elements
    for type in parcelleDict:
        if type != "bitSignature":
            for collectionName in parcelleDict[type]:
                selectCollection(collectionName)
    
    ## Export glb
    bpy.ops.export_scene.gltf(filepath=output_dir + "renders/" + "{}".format(parcelleDict["bitSignature"]), export_format='GLB', use_selection=True)

    ## Export image
    name = "{}".format(parcelleDict["bitSignature"])
    collectionNameList = parcelleDict["Building"] + parcelleDict["Defense"] + parcelleDict["Ressources"] + parcelleDict["Contour"] + parcelleDict["Sol"] + parcelleDict["Animaux"] + parcelleDict["Details"]
    createImage(name, collectionNameList)
    
  
def selectRender(collectionList):
    for coll in collectionList: 
        childName = [coll2.name for coll2 in coll.children]
        if (coll.name == name or coll.name == "Floor" or coll.name in childName):
            activateRenderCollection(coll.name)


def dictToSignature(parcelleDict, toDelete=False):
    if toDelete:
        return ""
    signature = [0 for x in range(17)]
    for type in parcelleDict:
        if type == "Animaux":
            if parcelleDict[type] != []:
                signature[listComponents.index("Animaux")] = 1
        elif type == "Details":
            if parcelleDict[type] != []:
                signature[listComponents.index("Details")] = 1
        elif type != "Sol":
            for component in parcelleDict[type]:
                signature[listComponents.index(component)] = 1
    signatureString = "".join(str(x) for x in signature)
    return signatureString
    

def activateRenderCollection(name):
    bpy.data.collections[name].hide_render = False


def desactivateRenderCollection(name):
    bpy.data.collections[name].hide_render = True
    

def createImage(imageName, collectionNameList):
    
    output_dirImage = output_dir + "images/"
    
    for coll in bpy.data.collections:
        coll.hide_render = True
        
    childNames = []
    for name in collectionNameList:
        childName = [coll.name for coll in bpy.data.collections[name].children]
        childNames = childNames + childName
    for coll in bpy.data.collections: 
        if (coll.name in collectionNameList or coll.name == "Floor" or coll.name in childNames):
            activateRenderCollection(coll.name)
        else:
            desactivateRenderCollection(coll.name)
            

    ## Export image with right name
    bpy.context.scene.render.film_transparent = True
    bpy.context.scene.render.image_settings.file_format='PNG'
    bpy.context.scene.render.image_settings.color_mode = 'RGBA'
    w,h = 200,200
    bpy.context.scene.render.resolution_x = w
    bpy.context.scene.render.resolution_y = h
    bpy.context.scene.render.resolution_percentage = 100
    imageName = imageName + ".png"
    bpy.context.scene.render.filepath = os.path.join(output_dirImage, imageName)
    bpy.ops.render.render(write_still=True)
    
    resetCollectionRender()
    
    
def resetCollectionRender():
    for coll in bpy.data.collections:
        coll.hide_render = False
        
def deselectAllCollections():
    for coll in bpy.data.collections:
        deselectCollection(coll.name)
        
        
for _ in range(10):
    print("--------------------------------------")
generateParcelleDict()
